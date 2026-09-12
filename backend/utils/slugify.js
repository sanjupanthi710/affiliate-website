const slugify = require('slugify');

// Builds a URL-safe, SEO-friendly slug and guarantees uniqueness
// by appending a short numeric suffix if a collision is found.
const makeUniqueSlug = async (Model, text, currentId = null) => {
  const base = slugify(text, { lower: true, strict: true, trim: true });
  let slug = base;
  let counter = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query = { slug };
    if (currentId) query._id = { $ne: currentId };
    const existing = await Model.findOne(query);
    if (!existing) return slug;
    counter += 1;
    slug = `${base}-${counter}`;
  }
};

module.exports = { makeUniqueSlug };
