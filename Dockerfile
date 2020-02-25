FROM node:10.16.3-alpine

WORKDIR /app

RUN apk add --no-cache tzdata

ENV TZ='Asia/Seoul'

COPY . /app

CMD npm run dev