// export default {
//   name: "mentor",
//   title: "Mentors",
//   type: "document",
//   fields: [
//     {
//       name: "name",
//       title: "Name",
//       type: "string",
//       validation: Rule => Rule.required()
//     },
//     {
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: { source: "name" }
//     },
//     {
//       name: "image",
//       title: "Profile Image",
//       type: "image",
//       options: { hotspot: true }
//     },
//     {
//       name: "designation",
//       title: "Designation",
//       type: "string"
//     },
//     {
//       name: "experience",
//       title: "Experience",
//       type: "string"
//     },
//     {
//       name: "bio",
//       title: "Bio",
//       type: "text"
//     }
//   ]
// }




// sanity/schemaTypes/mentor.ts
export default {
  name: "mentor",
  title: "Mentor",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name" },
    {
      name: "slug",
      type: "slug",
      options: { source: "name" },
    },
    { name: "image", type: "image" },
    { name: "designation", type: "string" },
    { name: "shortBio", type: "string", title: "Short Bio" },
    {
      name: "bio",
      type: "array",
      of: [{ type: "block" }],
    },
      {
      name: "expertise",
      title: "Expertise & Skills",
      type: "array",
      of: [{ type: "string" }],
      description: "Each item will appear as one expertise bullet",
    },
    {
  name: "seo",
  title: "SEO Settings",
  type: "seo",
},
  ],
};
