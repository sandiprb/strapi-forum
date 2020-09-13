"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate: async (result) => {
      console.log({ result });
      const { author, answer } = result;
      // TODO: send email to question author
      // TODO: send email to internal team
    },
  },
};
