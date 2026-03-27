export default {
  name: "seminar",
  title: "Seminars",
  type: "document",

  fields: [

    {
      name: "title",
      title: "Seminar Title",
      type: "string",
      validation: Rule => Rule.required()
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: Rule => Rule.required()
    },

    {
      name: "speaker",
      title: "Speaker",
      type: "string"
    },

    {
      name: "date",
      title: "Seminar Date",
      type: "date"
    },

    {
      name: "location",
      title: "Location",
      type: "string"
    },

    {
      name: "description",
      title: "Description",
      type: "text"
    },

    {
      name: "youtube",
      title: "YouTube Video Link",
      type: "url"
    },

    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options:{hotspot:true}
    },

    {
      name: "images",
      title: "Seminar Images",
      type: "array",
      of:[{type:"image"}]
    },

    {
      name: "upcoming",
      title: "Upcoming Event",
      type: "boolean"
    }

  ],

  preview:{
    select:{
      title:"title",
      subtitle:"speaker",
      media:"coverImage"
    }
  }

}





// export default {
//   name: "seminar",
//   title: "Free Seminar ",
//   type: "document",
//   fields: [
//     {
//       name: "heroTitle",
//       title: "Hero Title",
//       type: "string",
//       validation: Rule => Rule.required()
//     },
//     {
//       name: "heroSubtitle",
//       title: "Hero Subtitle",
//       type: "string",
//     },
//     {
//       name: "ctaButtonText",
//       title: "CTA Button Text",
//       type: "string",
//       initialValue: "Reserve Your Spot Now"
//     },
//     {
//       name: "dateTime",
//       title: "Date & Time",
//       type: "string"
//     },
//     {
//       name: "youtubeVideo",
//       title: "YouTube Video URL",
//       type: "url"
//     },
//     {
//       name: "topics",
//       title: "Topics Covered",
//       type: "array",
//       of: [{ type: "string" }]
//     },
//     {
//       name: "benefits",
//       title: "Seminar Benefits",
//       type: "array",
//       of: [
//         {
//           type: "object",
//           fields: [
//             { name: "title", type: "string", title: "Title" },
//             { name: "description", type: "string", title: "Description" }
//           ]
//         }
//       ]
//     }
//   ]
// }