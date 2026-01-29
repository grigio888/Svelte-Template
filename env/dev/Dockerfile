FROM node:alpine

WORKDIR /app

ENV PUBLIC_ENVIRONMENT=development

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]