// schemas/announcement.js
export default {
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Announcement Text',
      type: 'string',
      description: 'Text to display in the top banner'
    },
    {
      name: 'link',
      title: 'Announcement Link',
      type: 'url',
      description: 'Optional link if users can click'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only show if active',
      initialValue: true
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Optional custom background color',
      initialValue: '#3c449c'
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: '#ffffff'
    }
  ]
};