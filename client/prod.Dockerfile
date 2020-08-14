FROM node:12.16.1-alpine As builder

WORKDIR /client
COPY ./client .
RUN npm i
RUN npm run build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /client/dist/client/ /usr/share/nginx/html
