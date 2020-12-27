FROM node:12
# создание директории приложения
WORKDIR /usr/src/app
# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./
RUN npm install
# копируем исходный код
COPY . .
RUN npm run build
EXPOSE 4000
# RUN npm run start
CMD [ "node", "app.js" ]
