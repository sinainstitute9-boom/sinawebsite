export default {
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: Rule => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: Rule => Rule.required() },
    { name: "content", title: "Content", type: "text" },
    { name: "thumbnail", title: "Thumbnail", type: "image" },
    { name: "publishedAt", title: "Published At", type: "datetime" }
  ]
};