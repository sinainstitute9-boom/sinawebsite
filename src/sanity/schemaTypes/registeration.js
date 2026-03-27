export default {
  name: "registration",
  title: "Student Registrations",
  type: "document",
  fields: [
    { name: "programTitle", type: "string", title: "Program Title" },
    { name: "coordinator", type: "string", title: "Coordinator" },
    // { name: "batchNo", type: "string", title: "Batch No" },

    { name: "fullName", type: "string", title: "Full Name" },
    { name: "fatherName", type: "string", title: "Father Name" },
    { name: "cnic", type: "string", title: "CNIC" },
    { name: "dob", type: "date", title: "Date of Birth" },
    { name: "address", type: "text", title: "Address" },
    { name: "city", type: "string", title: "City" },
    { name: "contact", type: "string", title: "Contact No" },
    { name: "whatsapp", type: "string", title: "WhatsApp" },

    {
      name: "academics",
      title: "Academic Background",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "degree", type: "string" },
            { name: "year", type: "string" },
            { name: "institution", type: "string" },
          ],
        },
      ],
    },

    {
      name: "experience",
      title: "Work Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "organization", type: "string" },
            { name: "designation", type: "string" },
            { name: "period", type: "string" },
          ],
        },
      ],
    },
    {
  name: "photo",
  title: "Student Photo",
  type: "image",
  options: {
    hotspot: true,
  },
},

    { name: "comments", type: "text", title: "Comments" },
    { name: "agreed", type: "boolean", title: "Agreed to Terms" },
    { name: "createdAt", type: "datetime" },
  ],
}