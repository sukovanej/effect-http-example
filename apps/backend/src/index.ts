import * as Middleware from "@effect/platform/Http/Middleware";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import { NodeServer, RouterBuilder } from "effect-http";
import { api } from "@effect-http-example/api";
import { Effect } from "effect";
import { runMain } from "@effect/platform-node/Runtime";
import { PrettyLogger } from "effect-log";

const corsMiddleware = Middleware.make((app) =>
  Effect.flatMap(
    app,
    ServerResponse.setHeaders({
      "Access-Control-Allow-Origin": "http://localhost:3001",
    }),
  ),
);

const app = RouterBuilder.make(api).pipe(
  RouterBuilder.handle("getItems", () =>
    Effect.succeed([{ name: "test", value: 69 }]),
  ),
  RouterBuilder.build,
  corsMiddleware,
);

app.pipe(
  NodeServer.listen({ port: 3000 }),
  Effect.provide(PrettyLogger.layer()),
  runMain,
);
