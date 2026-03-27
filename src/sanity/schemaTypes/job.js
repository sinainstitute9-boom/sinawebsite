export default {
  name: "job",
  title: "Job Opportunity",
  type: "document",
  fields: [
    { name: "title", title: "Job Title", type: "string", validation: Rule => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: Rule => Rule.required() },
    { name: "description", title: "Job Description", type: "text", validation: Rule => Rule.required() },
    { name: "requirements", title: "Requirements", type: "array", of: [{ type: "string" }] },
    { name: "location", title: "Location", type: "string" },
    { name: "applyLink", title: "Apply Link", type: "url" }
  ]
};