import { Schema } from "@effect/schema";
import { Api } from "effect-http";

export const Item = Schema.struct({
  name: Schema.string,
  value: Schema.number,
})
export type Item = Schema.Schema.To<typeof Item>;

export const Items = Schema.array(Item)
export type Items = Schema.Schema.To<typeof Items>;

export const api = Api.api().pipe(
  Api.get('getItems', "/items", {
    response: Items
  })
)
