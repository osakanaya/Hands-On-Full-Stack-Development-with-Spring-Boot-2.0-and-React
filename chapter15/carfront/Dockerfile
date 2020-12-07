FROM node:10.14.1
RUN mkdir -p /usr/src/carfront

COPY build /usr/src/carfront/build
COPY server.js /usr/src/carfront
COPY deploy-package.json /usr/src/carfront/package.json

WORKDIR /usr/src/carfront
RUN echo 'package-lock=false' >> .npmrc
RUN npm install

EXPOSE 3500
CMD ["node", "server.js", "3500"]
