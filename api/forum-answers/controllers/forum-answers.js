"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    try {
      ctx.request.body.author = ctx.state.user.id;
      const entity = await strapi.services["forum-answers"].create(
        ctx.request.body
      );
      return sanitizeEntity(entity, {
        model: strapi.models["forum-answers"],
      });
    } catch (error) {
      console.error(error);
      ctx.status = 500;
    }
  },
  async like(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    try {
      let answer = await strapi.query("forum-answers").findOne({ id });
      answer.likedBy.push(user.id);
      await strapi.query("forum-answers").update({ id }, answer);
      return ctx.send({
        success: true,
      });
    } catch (error) {
      console.error(error);
      return ctx.send({
        success: false,
      });
    }
  },

  async dislike(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    try {
      let answer = await strapi.query("forum-answers").findOne({ id });
      answer.likedBy = answer.likedBy.filter((u) => u.id !== user.id);
      await strapi.query("forum-answers").update({ id }, answer);
      return ctx.send({
        success: true,
      });
    } catch (error) {
      console.log(error);
      return ctx.send({
        success: false,
      });
    }
  },
};
