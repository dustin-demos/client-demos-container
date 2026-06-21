FROM denoland/deno:alpine-2.7.14

WORKDIR /app

COPY deno.json ./
RUN deno install

COPY public ./public

COPY main.ts ./
RUN deno cache main.ts

ENV PORT=8080
EXPOSE 8080

CMD ["task", "start"]
