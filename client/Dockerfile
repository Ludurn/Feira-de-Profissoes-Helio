FROM node:18-alpine

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package*.json ./

RUN npm install

COPY . .

# port that VUE picks up
ENV PORT=8081

EXPOSE 8081

CMD ["npm", "run", "serve"]
