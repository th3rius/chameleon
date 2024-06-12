<div align="center">
    <a href="https://chameleon.nocnitsa.com/" target"_blank"><img src="https://chameleon.nocnitsa.com/vim.svg" width="60" /></a>
    <h3>Chameleon</h3>
    <p>Find Vim and Neovim colorschemes!</p>
</div>

## Table of contents:

- [Description](#description)
- [Prologue](#prologue)
- [Getting Started](#getting-started)
  - [Running the server](#running-the-server)
  - [Running the client](#running-the-client)
- [Epilogue](#epilogue)

## Description

An interactive online database of Vim and Neovim colorschemes that generates code previews by spinning up real Neovim instances in [script mode](https://neovim.io/doc/user/starting.html#silent-mode).

Visit it here: https://chameleon.nocnitsa.com/

Explore the GraphQL playground: https://api.chameleon.nocnitsa.com/playground/

## Prologue

This project is my submission to [Woovi's code challenge](https://woovi.com/jobs/challenges/software-engineer/). I aimed to build something legitimately fun to toy around with whilst still being able showcasing the potential of GraphQL well, and I believe I landed at the right idea: a colorscheme database for my favorite text editor.

Features include:

- A GraphQL server that fully implements the [Relay Server Specification](https://relay.dev/docs/guides/graphql-server-specification/), namely [Cursor Connections](https://relay.dev/graphql/connections.htm) and [Global Object Speicifcation](https://relay.dev/docs/guides/graphql-server-specification/);
- Follows Relay's recommended best pratices for [Fetching Queries](https://relay.dev/docs/guided-tour/rendering/queries/) ([Render as you Fetch](https://relay.dev/docs/guided-tour/rendering/queries/#render-as-you-fetch)) and [Pagination](https://relay.dev/docs/guided-tour/list-data/pagination/);
- Makes use of modern React features, such as [`<Suspsense />`](https://react.dev/reference/react/Suspense), [`useTransition`](https://react.dev/reference/react/useTransition) and [`lazy`](https://react.dev/reference/react/lazy).

The project aims to use simple tooling utilities rather than full-fledged frameworks to make the code easier and accessible to dive into while providing a comfy developer experience.

The core stack includes:

- [Koa.js](https://koajs.com/) with [graphql-community/koa-graphql](https://github.com/graphql-community/koa-graphql);
- [MongoDB](https://www.mongodb.com/);
- [React](https://react.dev/) + [Vite](https://vitejs.dev/).

## Getting Started

### Running the server

To run the server, you will need both an installation of [Neovim](https://neovim.io/) `>= v0.10.0` available on your `PATH` and a [MongoDB](https://www.mongodb.com/) database.

A GitHub [access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), used for fetching information about colorschemes on GitHub, is optional, but you'll likely run into issues by not providing one. No scopes are required. Learn more about this [here](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users).

- [Install Neovim](https://github.com/neovim/neovim/blob/master/INSTALL.md)
- [Installing MongoDB](https://www.mongodb.com/resources/products/fundamentals/get-started)
- [Generate a GitHub access token](https://github.com/settings/tokens/new)

> [!TIP]
> Run MongoDB with a single [Docker](https://www.docker.com/) command:
>
> ```sh
> docker run -d --restart unless-stopped --name chameleon -p 27017:27017 mongo
> ```

You'll need the following environment variables (they can also be configured with a `.env` file):

| **Variable**   | **Required?** | **Description**           |
| -------------- | ------------- | ------------------------- |
| `GITHUB_TOKEN` |               | GitHub access token       |
| `MONGODB_URI`  | Yes           | MongoDB connection string |

Install the dependencies:

```sh
npm i
```

Prepare the database indexes:

```sh
npm run setup -w extractor
```

Run the server:

```sh
npm start -w extractor
```

If you want to generate a **production** build, you can do so with:

```sh
npm run build -w extractor
```

To print a copy of the GraphQL schema, run:

```sh
npm run print-schema -w extractor
```

### Running the client

Prepare the following environment variables:

| **Variable**         | **Required?** | **Description**       |
| -------------------- | ------------- | --------------------- |
| `VITE_HTTP_ENDPOINT` |               | GraphQL HTTP endpoint |

Run the client:

```sh
npm run dev -w web
```

To run the [Relay Compiler](https://relay.dev/docs/guides/compiler/), open another terminal and run:

```sh
npm run relay -w web
```

If you want to generate a **production** build, you can do so with:

```sh
npm run build -w web
```

## Epilogue

I've used GraphQL heavily before, but I have never used Relay. I took this project as an opportunity to learn about the Relay client and how it makes it easy to manage data while being very decoupled with the use of fragments and data-fetching patterns.
It was also pretty challenging to design the backend to run Neovim instances and scrape colorschemes directly in an effitient manner – but it was a ton of fun!

Don't forget to checkout [Woovi](https://woovi.com/)'s website if this project has gotten your attention.

<p align="center">
  Made with :black_heart: by <a href="https://github.com/th3riu)" target="_blank">th3rius</a>
</p>
