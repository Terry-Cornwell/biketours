import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { jsonResponse } from "../../src/httpHelpers";
import type { Trip } from "@biketours/shared/types";

const demoTrip: Trip = {
  id: "sample-trip",
  ownerId: "demo-user",
  title: "Sample Ride",
  summary: "Static payload showing the expected shape for clients.",
  startDate: "2024-04-01",
  endDate: "2024-04-05",
  coverImage: "/images/demo/sample.jpg",
  privacy: "public",
  stages: [],
};

export async function getTripHandler(req: HttpRequest): Promise<HttpResponseInit> {
  const id = req.params["id"];
  if (!id) {
    return jsonResponse({ errors: ["id parameter required"] }, 400);
  }

  return jsonResponse({ data: { ...demoTrip, id } });
}

app.http("getTrip", {
  methods: ["GET"],
  route: "trips/{id}",
  authLevel: "function",
  handler: getTripHandler,
});
