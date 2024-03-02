import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {graphql, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql';
import {UserType} from "./types/UserType.js";
import {MemberType, MemberTypeIdField} from "./types/MemberType.js";
import {PostType} from "./types/PostType.js";
import {ProfileType} from "./types/ProfileType.js";
import {GraphQLContext} from "./types/Context.js";
import {UUIDType} from "./types/uuid.js";
import {MemberTypeId} from "../member-types/schemas.js";

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
        query: new GraphQLObjectType<unknown, GraphQLContext>({
          name: 'Query',
          fields: {
            users: {
              type: new GraphQLList(UserType),
              description: 'All users',
              resolve:  async (_, __, {db}) => await db.user.findMany(),
            },
            user: {
              type: UserType,
              description: 'Particular user',
              args: { id: { type: new GraphQLNonNull(UUIDType) } },
              resolve: async (_,{ id }: {id: string},{db}) => await db.user.findUnique(
                {
                  where: { id }
                })
            },
            memberTypes: {
              type: new GraphQLList(MemberType),
              description: 'All memberTypes',
              resolve:  async (_, __, {db}) => await db.memberType.findMany(),
            },
            memberType: {
              type: MemberType,
              description: 'Particular member type',
              args: { id: { type: new GraphQLNonNull(MemberTypeIdField) } },
              resolve: async (_,{ id }: {id: MemberTypeId},{db}) => await db.memberType.findUnique(
                {
                  where: { id }
                })
            },
            posts: {
              type: new GraphQLList(PostType),
              description: 'All posts',
              resolve:  async (_, __, {db}) => await db.post.findMany(),
            },
            post: {
              type: PostType,
              description: 'Particular post',
              args: { id: { type: new GraphQLNonNull(UUIDType) } },
              resolve: async (_,{ id }: {id: string},{db}) => await db.post.findUnique(
                {
                  where: { id }
                })
            },
            profiles: {
              type: new GraphQLList(ProfileType),
              description: 'All profiles',
              resolve:  async (_, __, {db}) => await db.profile.findMany(),
            },
            profile: {
              type: ProfileType,
              description: 'Particular profile',
              args: { id: { type: new GraphQLNonNull(UUIDType) } },
              resolve: async (_, { id }: {id: string},{db}) => await db.profile.findUnique(
                {
                  where: { id }
                })
            },
          },
        }),
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
