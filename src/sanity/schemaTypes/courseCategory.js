export default {
  name: 'courseCategory',
  title: 'Course Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
    {
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Course Name', type: 'string' },
            { name: 'image', title: 'Course Image', type: 'image', options: { hotspot: true } },
            { name: 'link', title: 'Course Link', type: 'string' },
            { name: 'description', title: 'Short Description', type: 'string' },
          ],
        },
      ],
    },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
}