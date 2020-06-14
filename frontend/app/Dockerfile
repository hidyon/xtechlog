FROM node:14.3.0-alpine3.10 as build-stage

# RUN yarn global add http-server
RUN mkdir -p /home/frontend/app
COPY ./package.json /home/frontend/app
WORKDIR /home/frontend/app
# RUN yarn install
COPY . .
RUN yarn run build

FROM nginx:1.17.10-alpine as production-stage
COPY --from=build-stage /home/frontend/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 

