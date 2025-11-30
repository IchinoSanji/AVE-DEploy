import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ai, SYSTEM_PROMPT } from "./gemini";
import { z } from "zod";

const ChatMessageSchema = z.object({
  message: z.string(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
});

const AnalyzeImageSchema = z.object({
  imageBase64: z.string(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Chat endpoint - processa mensagens de texto usando Gemini
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, conversationHistory = [] } = ChatMessageSchema.parse(req.body);

      const historyText = conversationHistory.map(msg => 
        `${msg.role === 'user' ? 'Usuário' : 'ArtVision'}: ${msg.content}`
      ).join('\n\n');

      const fullPrompt = `${SYSTEM_PROMPT}

${historyText ? `Histórico da conversa:\n${historyText}\n\n` : ''}Usuário: ${message}

ArtVision:`;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
      });

      const response = result.text || "Desculpe, não consegui processar sua mensagem.";

      res.json({ response });
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        error: 'Erro ao processar mensagem',
        details: error.message 
      });
    }
  });

  // Analyze endpoint - processa imagens usando Gemini
  app.post('/api/analyze', async (req, res) => {
    try {
      const { imageBase64 } = AnalyzeImageSchema.parse(req.body);

      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      const contents = [
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg",
          },
        },
        `Você é um especialista em história da arte. Analise esta imagem de obra de arte e retorne um JSON com:
{
  "style": "nome do estilo/movimento artístico",
  "artist": "nome provável do artista",
  "period": "período histórico",
  "ocrText": "texto detectado na imagem (se houver)",
  "aiDescription": "descrição detalhada da obra (2-3 frases)",
  "confidence": {
    "style": número entre 0 e 1,
    "artist": número entre 0 e 1
  }
}

Baseie-se nestes movimentos: Renascimento, Barroco, Neoclassicismo, Romantismo, Realismo, Impressionismo, Pós-Impressionismo, Expressionismo, Cubismo, Surrealismo, Modernismo, Arte Contemporânea.

Responda APENAS com o JSON, sem texto adicional.`
      ];

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
      });

      const responseText = result.text || '{}';
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const analysisResult = JSON.parse(jsonMatch ? jsonMatch[0] : '{}');

      res.json(analysisResult);
    } catch (error: any) {
      console.error('Analyze error:', error);
      res.status(500).json({ 
        error: 'Erro ao analisar imagem',
        details: error.message 
      });
    }
  });

  return httpServer;
}
