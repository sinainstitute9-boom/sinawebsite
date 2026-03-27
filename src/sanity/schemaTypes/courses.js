// export default {
//   name: "course",
//   title: "Courses",
//   type: "document",
//   fields: [
//     {
//       name: "title",
//       title: "Course Title",
//       type: "string",
//       validation: Rule => Rule.required()
//     },
//     {
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: { source: "title", maxLength: 96 }
//     },
//     {
//       name: "thumbnail",
//       title: "Course Thumbnail",
//       type: "image",
//       options: { hotspot: true }
//     },
//     {
//       name: "description",
//       title: "Description",
//       type: "text"
//     },
//     {
//       name: "duration",
//       title: "Duration",
//       type: "string"
//     },
//     {
//       name: "price",
//       title: "Fee",
//       type: "string"
//     },
//     {
//       name: "trainer",
//       title: "Trainer",
//       type: "reference",
//       to: [{ type: "mentor" }]
//     }
//   ]
// }




// schemas/course.js
export default {
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    { name: "title", title: "Course Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: "shortDescription", title: "Short Description", type: "text" },
    { name: "category", title: "Category", type: "string" },
    { name: "duration", title: "Duration", type: "string" },
    { name: "price", title: "Price", type: "string" },

    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    },

    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
  name: "lectures",
  title: "Lectures / Hours",
  type: "string"
},
{
  name: "level",
  title: "Level",
  type: "string",
  options: {
    list: ["Beginner", "Intermediate", "Advanced"]
  }
},
{
  name: "language",
  title: "Language",
  type: "string"
},
{
  name: "hasCertificate",
  title: "Certificate Available",
  type: "boolean"
}
,
    // 🔥 EXTRA IMAGES
    {
      name: "gallery",
      title: "Course Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },

    // 🔥 BENEFITS
    {
      name: "benefits",
      title: "Course Benefits",
      type: "array",
      of: [{ type: "string" }],
    },

    // 🔥 COURSE OUTLINE
    {
      name: "outline",
      title: "Course Outline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Section Title", type: "string" },
            { name: "description", title: "Section Description", type: "text" },
          ],
        },
      ],
    },

    // 🔥 INSTRUCTOR
    {
      name: "instructor",
      type: "reference",
      to: [{ type: "mentor" }],
    },

    // 🔥 CERTIFICATION
    {
      name: "certificate",
      title: "Certification Section",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "text", type: "text" },
        {
          name: "image",
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
  ],
  category: {
  type: "string",
  options: {
    list: [
      { title: "IT & Software", value: "it" },
      { title: "Networking & Cyber Security", value: "networking" },
      { title: "Engineering & Technical", value: "engineering" },
      { title: "Business & Finance", value: "business" },
      { title: "Language & Professional Skills", value: "language" },
    ]
  }
}
};
