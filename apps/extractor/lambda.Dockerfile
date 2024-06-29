FROM node

WORKDIR /app

COPY . .
RUN npm i
RUN npm run build:lambda

RUN ls dist

FROM public.ecr.aws/lambda/nodejs:20

WORKDIR /app

RUN dnf install tar gzip -y

RUN curl -L https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz | tar -C /opt -xzf -
ENV PATH="/opt/nvim-linux64/bin:${PATH}"

COPY --from=0 /app/dist .

CMD ["/app/index.handler"]
