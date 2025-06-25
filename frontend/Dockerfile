# Etapa 1: Build com Node.js
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Garante que as imagens externas estejam acessíveis ao React
COPY ./media/images ./public/media/images

# Build com compatibilidade para Node 17+
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# Etapa 2: Servir via Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx personalizado
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
