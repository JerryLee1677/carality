import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const analyticsEventSchema = z.object({
  eventName: z.string(),
  sessionId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export async function POST(request: NextRequest) {
  const payload = analyticsEventSchema.parse(await request.json());

  console.info("analytics:event", payload);

  return NextResponse.json({ ok: true }, { status: 201 });
}
