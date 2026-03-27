import { client } from "../../../sanity/lib/client";

// Sample mentor data
const sampleMentors = [
  {
    name: "Asma Hashmi",
    designation: "Frontend Developer",
    shortBio: "Expert in modern web technologies",
    bio: [
      {
        _type: "block",
        style: "normal",
        _key: "a1",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: "Asma Hashmi is a skilled frontend developer with extensive experience in React, Vue, and Angular.",
            _key: "b1",
          },
        ],
      },
    ],
    expertise: ["React", "Vue.js", "TypeScript", "Responsive Design", "UI/UX"],
  },
  {
    name: "Mr. Hafiz Salman Younas",
    designation: "Backend Developer",
    shortBio: "Node.js and Python specialist",
    bio: [
      {
        _type: "block",
        style: "normal",
        _key: "a2",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: "Hafiz Salman Younas specializes in backend development with Node.js, Python, and database management.",
            _key: "b2",
          },
        ],
      },
    ],
    expertise: ["Node.js", "Python", "MongoDB", "PostgreSQL", "API Design"],
  },
];

export async function POST() {
  try {
    const results = [];

    for (const mentor of sampleMentors) {
      try {
        const doc = {
          _type: "mentor",
          name: mentor.name,
          slug: {
            _type: "slug",
            current: mentor.name
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/[\s_]+/g, '-')
              .replace(/^-+|-+$/g, ''),
          },
          designation: mentor.designation,
          shortBio: mentor.shortBio,
          bio: mentor.bio,
          expertise: mentor.expertise,
        };

        const created = await client.create(doc);
        results.push({
          success: true,
          name: mentor.name,
          id: created._id,
        });
      } catch (error: any) {
        results.push({
          success: false,
          name: mentor.name,
          error: error.message,
        });
      }
    }

    return Response.json({
      message: "Sample mentors creation completed",
      results,
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const mentors = await client.fetch(`*[_type == "mentor"] {
      _id,
      name,
      slug,
      designation,
      shortBio,
      expertise
    }`);

    return Response.json({
      count: mentors.length,
      mentors,
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
