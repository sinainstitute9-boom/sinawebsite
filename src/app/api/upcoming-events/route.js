import { NextResponse } from "next/server"
import { client } from "../../../sanity/lib/client"
import { scheduleQuery } from "../../../sanity/lib/queries"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")

    const data = await client.fetch(scheduleQuery)
    const now = new Date()

    const upcoming = data
      .filter((item) => new Date(item.start) >= now)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      count: upcoming.length,
      events: upcoming,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch upcoming events" },
      { status: 500 }
    )
  }
}