// export const coursesQuery = `*[_type == "course"]{
//   _id,
//   title,
//   description,
//   duration,
//   price,
//   "imageUrl": image.asset->url
// }`

// query to fetch mentors (example structure)
// export const mentorsQuery = `*[_type == "mentor"]{
//   _id,
//   name,
//   designation,
//   experience,
//   "imageUrl": image.asset->url
// }`

// query for trainer profiles (can be same as mentors or customized)
// export const singleMentorQuery = `*[_type == "trainer"]{
//   _id,
//   name,
//   designation,
//   experience,
//   "imageUrl": image.asset->url
// }`


export const mentorsQuery = `
*[_type == "mentor"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  designation
}
`;

// SINGLE mentor - matches both explicit slug and generated slug from name
export const singleMentorQuery = `
*[_type == "mentor" && slug.current == $slug][0]{
  _id,
  name,
  designation,
  bio,
  image,
  expertise,
  slug,
  seo
}`;

export const feedbackQuery = `
*[_type == "feedback"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  course,
  text
}
`;

export const singleFeedbackQuery = `
*[_type == "feedback" && slug.current == $slug][0] {
  _id,
  name,
  course,
  text,
  youtubeVideo,
  image,
  slug
}
`;
export const coursesQuery = `
*[_type == "course"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  shortDescription,
  category,
  price,
  duration,
  lectures,
  level,
  language,
  hasCertificate,
  thumbnail,
  instructor->{
    name,
    image
  }
}
`;
export const singleCourseQuery = `
*[_type == "course" && slug.current == $slug][0]{
  _id,
  title,
  shortDescription,
  duration,
  lectures,
  level,
  language,
  price,
  category,
  hasCertificate,
  thumbnail,
  description,
  benefits,
  whoIsFor,
  outline,
  instructor->{
    name,
    image
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    noIndex,
    ogImage
  }
}
`;
// sanity/lib/queries.ts
export const singleServiceQuery = `
*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortDescription,
  description,
  image,
}
`;
// export const singleCourseQuery = `
// *[_type=="course" && slug.current==$slug][0]{
//   title,
//   category,
//   thumbnail,
//   description,
//   features,
//   gallery,
//   benefits,
//   outline,

//   instructor->{
//     name,
//     designation,
//     image
//   },

//   certificate
// }
// `;
export const servicesQuery = `*[_type == "service"]{
  _id,
  title,
  slug,
  shortDescription,
  image,
}`
;
export const scheduleQuery = `*[_type == "classSchedule"]{
  _id,
  title,
  course,
  instructor,
  start,
  end,
  room,
  color,
}`
;
// All courses
export const allFeeStructuresQuery = `*[_type == "feeStructure"]{
  title,
  slug,
  fee,
  duration,
}`

// Single course by slug
// export const feeStructureBySlugQuery = (slug) => `*[_type == "feeStructure" && slug.current == "${slug}"][0]{
//   title,
//   fee,
//   duration,
//   description
// }`

// sanity/queries.js
export const seminarsQuery = `*[_type == "seminar"] | order(date desc){
  _id,
  title,
  slug,
  speaker,
  date,
  location,
  youtube,
  coverImage,
  upcoming,
}`
;
export const singleSeminarQuery = `
*[_type == "seminar" && slug.current == $slug][0]{
  title,
  speaker,
  date,
  location,
  description,
  youtube,
  images,
}`
;
export const upcomingSeminarsQuery = `*[_type == "seminar" && upcoming == true]{
  title,
  date,
}`
;
export const galleryQuery = `*[_type == "gallery"]{
  _id,
  title,
  slug,
  department,
  description,
  coverImage,
}`
;
export const singleGalleryQuery = `*[_type == "gallery" && slug.current == $slug][0]{
  title,
  department,
  description,
  images,
}`
;
export const registrationBySlug = `
*[_type == "registration" && slug.current == $slug][0]{
  programTitle,
  coordinator,
  fullName,
  fatherName,
  cnic,
  dob,
  address,
  city,
  contact,
  whatsapp,
  academics,
  experience,
  comments,
}
`

export const allRegistrationSlugs = `
*[_type == "registration" && defined(slug.current)][].slug.current
`;

// sanity/lib/queries.js
export const faqQuery = `*[_type == "faq"] | order(category asc) {
  question,
  answer,
  category
}`
;
export const jobsQuery = `*[_type == "job"] | order(_createdAt desc){
  title, slug, description, requirements, location, applyLink
}`;


export const blogsQuery = `*[_type in ["blog", "post"]] | order(publishedAt desc){
  title,
  slug,
  content,
  body,
  thumbnail,
  mainImage,
  publishedAt,
}`;
export const feeStructureBySlugQuery = `
  *[_type == "feeStructure" && slug.current == $slug][0]{
    title,
    fee,
    duration,
    description,
  }
`

export const jobBySlugQuery = `
  *[_type == "job" && slug.current == $slug][0]{
    title, description, requirements, location, applyLink
  }
`

export const blogBySlugQuery = (slug) => `*[_type in ["blog", "post"] && slug.current=="${slug}"][0]{
  title,
  content,
  body,
  thumbnail,
  mainImage,
  publishedAt,
}`;
// lib/queries.js
export const getActiveAnnouncementsQuery = `
  *[_type == "announcement" && isActive == true] | order(_createdAt desc) {
    _id,
    text,
    link,
    backgroundColor,
    textColor,
  }
`;
export const getHomePageQuery = `*[_type == "homePage"][0]{
  aboutTitle,
  "aboutImageUrl": aboutImage.asset->url,
  aboutDescription1,
  aboutDescription2,
  aboutDescription3,
  contactEmail,
  contactPhone,
  contactDescription,
}`

export const getCourseCategoriesQuery = `*[_type == "courseCategory"] | order(order asc) {
  title,
  order,
  courses[]{
    name,
    "imageUrl": image.asset->url,
    link,
    description,
  }
}`
;
export const getCoursesByCategoryQuery = `
*[_type == "course"] | order(title asc) {
  title,
  category,
  "imageUrl": thumbnail.asset->url,
  slug
}
`;
// export const getCoursesByCategoryQuery = `
// {
//   "itSoftware": *[_type == "course" && category == "it-software"] | order(title asc) {
//     title,
//     "imageUrl": thumbnail.asset->url,
//     slug
//   },
//   "networking": *[_type == "course" && category == "networking-cyber"] | order(title asc) {
//     title,
//     "imageUrl": thumbnail.asset->url,
//     slug
//   },
//   "engineering": *[_type == "course" && category == "engineering-technical"] | order(title asc) {
//     title,
//     "imageUrl": thumbnail.asset->url,
//     slug
//   },
//   "business": *[_type == "course" && category == "business-finance"] | order(title asc) {
//     title,
//     "imageUrl": thumbnail.asset->url,
//     slug
//   },
//   "language": *[_type == "course" && category == "language-professional"] | order(title asc) {
//     title,
//     "imageUrl": thumbnail.asset->url,
//     slug
//   }
// }
// `