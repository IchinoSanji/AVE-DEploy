# AVE

O **ArtVision Edu** organiza frontend, backend e módulos compartilhados em um monorepo simples e eficiente, permitindo desenvolvimento integrado e implantação facilitada. Este repositório inclui configuração de build, scripts de automação e suporte a containerização.

---

## 📘 Visão Geral
O projeto reúne:
- Aplicação **client** (frontend).
- API **server** com lógica isolada.
- Módulo **shared** para tipagens e utilidades comuns.
- Scripts auxiliares para build e deploy.
- Arquivos prontos para uso em ambientes locais ou produtivos.

---

## 📂 Estrutura do Repositório
```
/
├── client/              # Interface do usuário
├── server/              # Backend / API
├── shared/              # Código compartilhado
├── script/              # Automação e ferramentas
├── dist/                # Saída de builds
├── Dockerfile           # Configuração de container
├── render.yaml          # Deploy via Render.com
├── package.json         # Metadados gerais
└── Configurações diversas
```

---

## ✨ Recursos
- Organização clara e modular.
- Suporte completo para TypeScript.
- Sistema de build para múltiplos ambientes.
- Deploy simplificado por Docker ou Render.
- Separação entre interface, API e código compartilhado.

---

## 🔧 Requisitos
- Node.js (versão recomendada: LTS)
- npm ou yarn
- Docker (opcional)
- Variáveis de ambiente para o backend

---

## ▶️ Execução Local
### 1. Clone o repositório
```bash
git clone https://github.com/IchinoSanji/AVE-DEploy.git
cd AVE-DEploy
```

### 2. Instale dependências
Frontend:
```bash
cd client
npm install
```
Backend:
```bash
cd ../server
npm install
```

### 3. Inicie o ambiente de desenvolvimento
Frontend:
```bash
npm run dev
```
Backend:
```bash
npm start
```

---

## ⚙️ Variáveis de Ambiente
Crie um arquivo `.env` na pasta `server`.

Exemplo:
```
PORT=3000
DATABASE_URL=""
TOKEN_SECRET_KEY=""
```

---

## 🏗️ Processo de Build
### Build do client
```bash
cd client
npm run build
```

### Build do server
```bash
cd server
npm run build
```

---

## 🐳 Uso com Docker
### Criar imagem
```bash
docker build -t ave-deploy .
```
### Executar container
```bash
docker run -p 3000:3000 ave-deploy
```

---

## 🌐 Deploy
O arquivo `render.yaml` permite deploy imediato no Render.com.

Passos:
1. Abra o painel da Render.
2. Clique em **New Web Service**.
3. Selecione este repositório.
4. O serviço será configurado automaticamente.

Também é possível publicar via Docker em qualquer VPS.

---

## 🛠️ Tecnologias
- TypeScript
- Node.js
- Vite
- Docker
- Scripts de automação

---

## 🤝 Contribuição
1. Crie um fork.
2. Abra uma branch:
```bash
git checkout -b minha-contribuicao
```
3. Faça suas alterações.
4. Envie um Pull Request.