FROM google/nodejs:latest

WORKDIR /app
ADD . /app
RUN npm install
