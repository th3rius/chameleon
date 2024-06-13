FROM node
	
WORKDIR /app

COPY . .

RUN npm i
RUN npx relay-compiler
RUN npm run build
RUN npm i -g serve

CMD ["serve", "dist"]
