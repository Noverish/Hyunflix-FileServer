FROM node:10.16.3-alpine

WORKDIR /app

COPY ./ /app

ENV SERVE_PATH=/archive

CMD ["npm", "start"]