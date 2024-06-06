FROM node:18-alpine

WORKDIR /app
COPY . /app
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081
ENTRYPOINT ["node", "dist/src/index.js"]