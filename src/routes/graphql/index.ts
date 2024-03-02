import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {graphql, GraphQLSchema} from 'graphql';
import {query} from "./query.js";
import {mutation} from "./mutation.js";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma} = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const schema = new GraphQLSchema({
        query,
        mutation
      });
      return await graphql({
        schema,
        source: req.body.query,
        contextValue: {
          db: prisma,
        },
        variableValues: req.body.variables
      });
    },
  });
};

export default plugin;
