import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {graphql, GraphQLSchema, parse, validate} from 'graphql';
import {query} from "./query.js";
import {mutation} from "./mutation.js";
import depthLimit from "graphql-depth-limit";

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
      })
      const errors = validate(
        schema,
        parse(String(req.body.query)),
        [depthLimit(5)]
      );
      if (errors.length) {
        return {
          errors,
        };
      }
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
