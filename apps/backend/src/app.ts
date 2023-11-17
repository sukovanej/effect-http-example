import { Middlewares, RouterBuilder } from "effect-http";
import { api } from "@effect-http-example/api";
import { Effect } from "effect";

export const app = RouterBuilder.make(api).pipe(
  RouterBuilder.handle("getItems", () =>
    Effect.succeed([{ name: "test", value: 69 }]),
  ),
  RouterBuilder.build,
  Middlewares.cors({ origin: "http://localhost:3001" }),
);

