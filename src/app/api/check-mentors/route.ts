import { client } from "../../../sanity/lib/client";

export async function GET() {
  try {
    const mentors = await client.fetch(`*[_type == "mentor"] {
      _id,
      name,
      slug,
      designation
    }`);

    return Response.json({
      success: true,
      count: mentors.length,
      mentors: mentors,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
