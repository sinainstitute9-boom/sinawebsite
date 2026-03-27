export default {
  name: "feedback",
  title: "Student Feedback",
  type: "document",

  fields: [

    {
      name: "name",
      title: "Student Name",
      type: "string",
      validation: Rule => Rule.required()
    },

    {
      name: "course",
      title: "Course",
      type: "string"
    },

    {
      name: "text",
      title: "Feedback Text",
      type: "text",
      rows: 4,
      validation: Rule => Rule.required()
    },
     {
      name: "youtubeVideo",
      title: "YouTube Video URL",
      type: "url"
    },

    {
      name: "image",
      title: "Student Photo",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string"
        }
      ]
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }

  ],

  preview: {
    select: {
      title: "name",
      subtitle: "course",
      media: "image"
    }
  }

};