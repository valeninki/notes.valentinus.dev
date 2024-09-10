<<<<<<< HEAD
FROM node:22-slim AS builder
=======
FROM node:20-slim as builder
>>>>>>> 02f2423 (Initial commit)
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
RUN npm ci

<<<<<<< HEAD
FROM node:22-slim
=======
FROM node:20-slim
>>>>>>> 02f2423 (Initial commit)
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .
CMD ["npx", "quartz", "build", "--serve"]
