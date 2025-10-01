<<<<<<< HEAD
<<<<<<< HEAD
FROM node:22-slim AS builder
=======
FROM node:20-slim as builder
>>>>>>> 02f2423 (Initial commit)
=======
FROM node:20-slim as builder
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
RUN npm ci

<<<<<<< HEAD
<<<<<<< HEAD
FROM node:22-slim
=======
FROM node:20-slim
>>>>>>> 02f2423 (Initial commit)
=======
FROM node:20-slim
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .
CMD ["npx", "quartz", "build", "--serve"]
