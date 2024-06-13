FROM node

WORKDIR /app

COPY . .
RUN npm i
RUN npm run build

RUN curl -L https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz | tar -C /opt -xzf -
ENV PATH="/opt/nvim-linux64/bin:${PATH}"

CMD ["node", "dist/index"]
