import { api } from "@effect-http-example/api";
import { Client } from "effect-http";

const BACKEND_URL = "http://localhost:3000";

export const client = Client.make(api, { baseUrl: BACKEND_URL });
