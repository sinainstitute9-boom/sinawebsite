export default {
  name: "classSchedule",
  title: "Class Schedule",
  type: "document",

  fields: [

    {
      name: "title",
      title: "Class Title",
      type: "string"
    },

    {
      name: "course",
      title: "Course Name",
      type: "string"
    },

    {
      name: "instructor",
      title: "Instructor",
      type: "string"
    },

    {
      name: "start",
      title: "Start Date & Time",
      type: "datetime"
    },

    {
      name: "end",
      title: "End Date & Time",
      type: "datetime"
    },

    {
      name: "room",
      title: "Class Room",
      type: "string"
    },

    {
      name: "color",
      title: "Event Color",
      type: "string",
      options: {
        list: [
          {title:"Blue", value:"#074166"},
          {title:"Yellow", value:"#fdad1b"},
          {title:"Green", value:"#10b981"},
          {title:"Purple", value:"#7c3aed"}
        ]
      }
    }

  ]
}