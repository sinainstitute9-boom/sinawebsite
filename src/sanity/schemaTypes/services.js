export default {
  name: "service",
  title: "Services",
  type: "document",

  fields: [

    {
      name: "title",
      title: "Service Title",
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
      name: "shortDescription",
      title: "Short Description",
      type: "text"
    },

    {
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }]
    },

    {
      name: "image",
      title: "Service Image",
      type: "image",
      options: { hotspot: true }
    }

  ],

  preview: {
    select: {
      title: "title",
      media: "image"
    }
  }
}