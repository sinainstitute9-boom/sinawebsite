// This script helps populate slug values for mentors without them
// Run with: node scripts/populate-mentor-slugs.js

import { client } from '../src/sanity/lib/client.js';

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

async function populateSlugs() {
  try {
    console.log('Fetching mentors without slugs...');
    
    const mentors = await client.fetch(`
      *[_type == "mentor" && !slug.current] {
        _id,
        name
      }
    `);

    console.log(`Found ${mentors.length} mentors without slugs`);

    if (mentors.length === 0) {
      console.log('All mentors already have slugs!');
      return;
    }

    for (const mentor of mentors) {
      const slug = slugify(mentor.name);
      console.log(`Updating ${mentor.name} -> ${slug}`);
      
      await client
        .patch(mentor._id)
        .set({ slug: { _type: 'slug', current: slug } })
        .commit();
    }

    console.log('✅ Done! All mentors now have slugs.');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

populateSlugs();
