export default {
  name: "seo",
  title: "SEO Settings",
  type: "object",
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines and social media",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Description for search engines and social media",
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "SEO keywords",
    },
    {
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social media sharing",
    },
    {
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing",
    },
  ],
};
