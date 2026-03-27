export default {
  name: "gallery",
  title: "Gallery",
  type: "document",

  fields: [

    {
      name: "title",
      title: "Gallery Title",
      type: "string",
      validation: Rule => Rule.required()
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },

    {
      name: "department",
      title: "Department",
      type: "string"
    },

    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true }
    },

    {
      name: "description",
      title: "Description",
      type: "text"
    },

    {
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options:{hotspot:true} }]
    }

  ],

  preview: {
    select: {
      title: "title",
      subtitle: "department",
      media: "coverImage"
    }
  }
}