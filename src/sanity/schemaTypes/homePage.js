export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // ABOUT SECTION
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
    },
    {
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'aboutDescription1',
      title: 'About Description 1',
      type: 'text',
    },
    {
      name: 'aboutDescription2',
      title: 'About Description 2',
      type: 'text',
    },
    {
      name: 'aboutDescription3',
      title: 'About Description 3',
      type: 'text',
    },

    // CONTACT SECTION
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
    },
  ],
}