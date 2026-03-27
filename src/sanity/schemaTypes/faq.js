// sanity/schemas/faq.js
export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required().error('Question is required')
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: Rule => Rule.required().error('Answer is required')
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Admission', value: 'admission' },
          { title: 'Courses', value: 'courses' },
          { title: 'Payments', value: 'payments' },
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    }
  ]
}