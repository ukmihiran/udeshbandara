import { getFeaturedRepos } from "@/lib/github";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  try {
    const repos = await getFeaturedRepos();
    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ repos: [] });
  }
}
