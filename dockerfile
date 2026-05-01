# 1. BASE: Utiliza a versão estável do Node (v20) em Alpine para menor tamanho
FROM node:20-alpine AS base

# 2. DEPS: Instala apenas as dependências necessárias
FROM base AS deps
# Adição necessária para bibliotecas que dependem de build nativo no Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia os arquivos de definição de pacotes
COPY package.json package-lock.json* ./
# Instala as dependências (incluindo as de desenvolvimento para o build)
RUN npm install

# 3. BUILDER: Compila o projeto
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilita a telemetria do Next.js durante o build para maior privacidade
ENV NEXT_TELEMETRY_DISABLED 1

# Gera o build standalone otimizado
RUN npm run build

# 4. RUNNER: Imagem final que será executada no Railway
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Cria um usuário não-root para segurança (boas práticas de Clean Architecture)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia apenas o necessário do estágio de build (Standalone)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Porta padrão do Railway
# O Railway exige que o servidor escute na porta fornecida pela variável de ambiente PORT
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", ".next/standalone/server.js"]