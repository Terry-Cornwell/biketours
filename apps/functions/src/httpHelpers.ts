import type { HttpRequest, HttpResponseInit } from "@azure/functions";

export function jsonResponse(body: unknown, status: number = 200): HttpResponseInit {
  return {
    status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body, null, 2),
  };
}

export async function parseBody<T>(req: HttpRequest): Promise<T | undefined> {
  if (!req.body) return undefined;
  try {
    const buffer = await req.arrayBuffer();
    const text = Buffer.from(buffer).toString();
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Failed to parse body", error);
    return undefined;
  }
}
