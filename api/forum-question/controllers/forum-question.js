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
      const entity = await strapi.services["forum-question"].create(
        ctx.request.body
      );

      return sanitizeEntity(entity, {
        model: strapi.models["forum-question"],
      });
    } catch (error) {
      console.error(error);
      ctx.status = 500;
    }
  },
  async view(ctx) {
    const { id } = ctx.params;

    try {
      const question = await strapi.query("forum-question").findOne({ id });
      const viewsCount = parseInt(question.viewsCount) + 1;
      await strapi.query("forum-question").update(
        { id },
        {
          viewsCount,
        }
      );
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
  async like(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    try {
      let question = await strapi.query("forum-question").findOne({ id });
      var likedBy = question.likedBy.map((u) => u.id);
      likedBy.push(user.id);
      await strapi.query("forum-question").update({ id }, { likedBy: likedBy });
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
      let question = await strapi.query("forum-question").findOne({ id });
      const likedBy = question.likedBy
        .filter((u) => u.id !== user.id)
        .map((u) => u.id);
      await strapi.query("forum-question").update({ id }, { likedBy: likedBy });
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
