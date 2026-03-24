import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { parseGCSNotification } from '@stackmatix/cms-core';

/** Health check. */
export function GET() {
  return NextResponse.json({ status: 'ok' });
}

/** Handle GCS Pub/Sub notification to revalidate content paths. */
export async function POST(request: NextRequest) {
  const token = request.headers.get('x-webhook-token');
  if (!token || token !== process.env.CONTENT_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const result = parseGCSNotification(payload);

  if (!result) {
    return NextResponse.json({ error: 'invalid notification' }, { status: 400 });
  }

  for (const path of result.revalidatePaths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: result.revalidatePaths,
    slug: result.slug,
    category: result.category,
  });
}
