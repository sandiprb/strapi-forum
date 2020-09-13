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
      const entity = await strapi.services["forum-answer-comments"].create(
        ctx.request.body
      );
      return sanitizeEntity(entity, {
        model: strapi.models["forum-answer-comments"],
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
      let comment = await strapi.query("forum-answer-comments").findOne({ id });
      comment.likedBy.push(user.id);
      await strapi.query("forum-answer-comments").update({ id }, comment);
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

  async dislike(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    try {
      let comment = await strapi.query("forum-answer-comments").findOne({ id });
      comment.likedBy = comment.likedBy.filter((u) => u.id !== user.id);
      await strapi.query("forum-answer-comments").update({ id }, comment);
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
