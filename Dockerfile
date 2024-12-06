FROM node
WORKDIR /app
COPY package.json /app
COPY ./app.js /app
COPY wait-for-it.sh /app/
RUN chmod +x /app/wait-for-it.sh

RUN npm install
CMD ["./wait-for-it.sh", "db:3306", "--", "node", "app.js"]