FROM node:16.15.0

WORKDIR /app
COPY package.json /app
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ]; then npm install; else npm install --only=prod; fi

COPY . .

CMD [""]