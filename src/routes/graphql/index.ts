import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {graphql, GraphQLList, GraphQLObjectType, GraphQLSchema} from 'graphql';
import {UserType} from "./types/UserType.js";
import {MemberType} from "./types/MemberType.js";
import {PostType} from "./types/PostType.js";
import {ProfileType} from "./types/ProfileType.js";

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
        query: new GraphQLObjectType({
          name: 'Query',
          fields: {
            users: {
              type: new GraphQLList(UserType),
              description: 'All users',
              resolve:  async () => await prisma.user.findMany(),
            },
            memberTypes: {
              type: new GraphQLList(MemberType),
              description: 'All memberTypes',
              resolve:  async () => await prisma.memberType.findMany(),
            },
            posts: {
              type: new GraphQLList(PostType),
              description: 'All posts',
              resolve:  async () => await prisma.post.findMany(),
            },
            profiles: {
              type: new GraphQLList(ProfileType),
              description: 'All profiles',
              resolve:  async () => await prisma.profile.findMany(),
            },
          },
        }),
      });
      return await graphql({
        schema,
        source: req.body.query,
        contextValue: {
          db: prisma,
        }
      });
    },
  });
};

export default plugin;
