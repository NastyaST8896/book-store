ARG VITE_API_URL
ARG VITE_API_URL_WITHOUT_API

FROM node:24-slim AS build

ARG VITE_API_URL
ARG VITE_API_URL_WITHOUT_API
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_WITHOUT_API=$VITE_API_URL_WITHOUT_API

WORKDIR /opt/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /opt/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]