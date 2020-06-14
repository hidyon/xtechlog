FROM node:14.3.0-stretch-slim

RUN mkdir -p /home/backend/app
COPY ./package.json /home/backend/app
WORKDIR /home/backend/app
# RUN yarn install
COPY . .
EXPOSE 3000

CMD ["node", "index"]


