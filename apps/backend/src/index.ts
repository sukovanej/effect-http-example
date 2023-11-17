import * as Middleware from "@effect/platform/Http/Middleware";
import * as ServerResponse from "@effect/platform/Http/ServerResponse";
import * as ServerRequest from "@effect/platform/Http/ServerRequest";
import { NodeServer, RouterBuilder } from "effect-http";
import { api } from "@effect-http-example/api";
import { Effect } from "effect";
import { runMain } from "@effect/platform-node/Runtime";
import { PrettyLogger } from "effect-log";

const corsMiddleware = (_allowedOrigins: readonly string[] | string) => {
  const allowedOrigins =
    typeof _allowedOrigins === "string" ? [_allowedOrigins] : _allowedOrigins;

  return Middleware.make((app) =>
    Effect.gen(function* (_) {
      const request = yield* _(ServerRequest.ServerRequest);
      let response = yield* _(app);

      const url = request.headers["origin"] || request.url;

      if (allowedOrigins.includes(url)) {
        response = response.pipe(
          ServerResponse.setHeaders({
            "Access-Control-Allow-Origin": url,
          }),
        );
      }

      return response;
    }),
  );
};

const app = RouterBuilder.make(api).pipe(
  RouterBuilder.handle("getItems", () =>
    Effect.succeed([{ name: "test", value: 69 }]),
  ),
  RouterBuilder.build,
  corsMiddleware(["http://localhost:3001", "http://localhost:3002"]),
);

app.pipe(
  NodeServer.listen({ port: 3000 }),
  Effect.provide(PrettyLogger.layer()),
  runMain,
);
