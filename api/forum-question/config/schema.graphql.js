const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  query: `
    forumQuestionBySlug(slug: String!): ForumQuestion!
  `,
  resolver: {
    Query: {
      forumQuestion: {
        description: "Return a single ForumQuestion",
      },
      forumQuestions: {
        description: "Return a list of ForumQuestion",
      },
      forumQuestionBySlug: {
        description: "Return the forumQuestions by its slug",
        resolverOf: "application::forum-question.forum-question.findOne",
        resolver: async (_, { slug }, ctx) => {
          const entity = await strapi.services["forum-question"].findOne({
            slug,
            isPublished: true,
          });
          if (entity) {
            return sanitizeEntity(entity, {
              model: strapi.models["forum-question"],
            });
          }
        },
      },
    },
  },
};
