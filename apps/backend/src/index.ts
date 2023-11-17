import { NodeServer } from "effect-http";
import { Config, Effect, LogLevel, Logger, pipe } from "effect";
import { runMain } from "@effect/platform-node/Runtime";
import { PrettyLogger } from "effect-log";
import { app } from "./app.js";

const ServerConfig = Config.all({
  port: Config.number("PORT").pipe(Config.withDefault(3000)),
});

const main = pipe(
  Effect.config(ServerConfig),
  Effect.flatMap((config) => app.pipe(NodeServer.listen({ port: config.port }))),
  Effect.provide(PrettyLogger.layer()),
  Logger.withMinimumLogLevel(LogLevel.Warning)
);

runMain(main);
