import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { v4 as uuid } from "uuid";
import { parseBody, jsonResponse } from "../../src/httpHelpers";
import type { CreateTripRequest, Trip } from "@biketours/shared/types";

export async function createTripHandler(req: HttpRequest): Promise<HttpResponseInit> {
  const payload = await parseBody<CreateTripRequest>(req);

  if (!payload || !payload.title || !payload.startDate) {
    return jsonResponse({ errors: ["title and startDate are required"] }, 400);
  }

  const trip: Trip = {
    id: uuid(),
    ownerId: "placeholder-user",
    title: payload.title,
    summary: payload.summary,
    startDate: payload.startDate,
    endDate: payload.endDate,
    coverImage: payload.coverImage,
    privacy: payload.privacy ?? "private",
    stages: [],
  };

  return jsonResponse({ data: trip }, 201);
}

app.http("createTrip", {
  methods: ["POST"],
  route: "trips",
  authLevel: "function",
  handler: createTripHandler,
});
