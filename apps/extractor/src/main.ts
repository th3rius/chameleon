import app from "./app";
import http from "http";
import chalk from "chalk";
import type {AddressInfo} from "net";

async function bootstrap() {
  const expressApp = await app();

  const PORT = Number(process.env.PORT || 4000);
  const HOST = process.env.HOST || "localhost";

  const server = http.createServer(expressApp);
  server.listen(PORT, HOST, () => {
    const {address, port} = server.address() as AddressInfo;
    console.log(
      `Server is running at ${chalk.cyan(`http://${address}:${port}`)}! 👾`,
    );
  });
}

bootstrap();
