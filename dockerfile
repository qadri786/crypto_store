FROM node


# RUN apt-get update \
#     && apt-get install -fy \
#         libpq-dev \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /code
WORKDIR /code
COPY package.json .
COPY ecosystem.config.js .
RUN npm install -g pm2
RUN npm install -g nodemon
RUN npm install -g cross-env
RUN npm install knex -g
# RUN npm install pg-native -g
# Show current folder structure in logs
# RUN ls -al -R
RUN npm install
COPY . .
ENV NPM_CONFIG_LOGLEVEL warn