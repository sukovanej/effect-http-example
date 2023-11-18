import { Middlewares, RouterBuilder } from "effect-http";
import { api } from "@effect-http-example/api";
import { Effect } from "effect";

// Result of a weird behaviour of typescript with pnpm
import type {} from "@effect/platform/Http/App";

export const app = RouterBuilder.make(api).pipe(
  RouterBuilder.handle("getItems", () =>
    Effect.succeed([{ name: "test", value: 69 }]),
  ),
  RouterBuilder.build,
  Middlewares.cors(),
);
