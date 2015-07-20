FROM google/nodejs:latest

WORKDIR /app
ADD . /app
RUN npm install

ENTRYPOINT ["/nodejs/bin/node", "app.js"]