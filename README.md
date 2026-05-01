# 🚀 OM | Talent Architect

O **OM** é uma plataforma inteligente de análise de currículos desenvolvida para automatizar a triagem de talentos. O sistema utiliza uma arquitetura desacoplada, integrando um frontend de alta performance em **Next.js** com um motor de automação via **n8n**, processando dados através de inteligência artificial.

## 🛠️ Stack Tecnológica
*   **Frontend:** Next.js 15, TypeScript.
*   **UI/UX:** Tailwind CSS, Framer Motion, Lucide React.
*   **Validação:** Zod & React Hook Form.
*   **Automação:** n8n (Workflow Engine).
*   **Infra:** Docker & Railway.

## 🚀 Como Executar
1. Instale as dependências: `npm install`
2. Configure o `.env.local`: `N8N_URL=sua_url_aqui`
3. Inicie: `npm run dev`

## 🐳 Deploy via Docker
```bash
docker build -t om-app .
docker run -p 3000:3000 om-app
```

## 👤 Autores

### **Otávio Augusto Pascoal**
*Analista de Sistemas & Estudante de Engenharia de Computação*

### **Matheus Freitas**
*Analista de Sistemas e Engenheiro da Computação*

### **Bruno Matheus**
*Coordenador de Sistemas*

---
*Este projeto utiliza os princípios de Clean Architecture e DDD para garantir escalabilidade e fácil manutenção.*