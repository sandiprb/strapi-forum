"use strict";
const urlSlug = require("url-slug");
const Hashids = require("hashids");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const generateUniqueSlug = async (title) => {
  const slug = urlSlug(title.toLowerCase());
  const exists = await strapi.query("forum-question").findOne({ slug });
  if (!exists) return slug;

  const hashids = new Hashids();
  return `${slug}-${hashids.encode(Date.now()).toLowerCase()}`;
};

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      data.slug = await generateUniqueSlug(data.title);
    },
    afterCreate: async (result) => {
      console.log({ result });
      // TODO: send email alert to team
    },
  },
};
