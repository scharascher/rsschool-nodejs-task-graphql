import {GraphQLList, GraphQLNonNull, GraphQLObjectType} from "graphql/index.js";
import {GraphQLContext} from "./types/Context.js";
import {UserType} from "./types/UserType.js";
import {UUIDType} from "./types/uuid.js";
import {MemberType, MemberTypeIdField} from "./types/MemberType.js";
import {MemberTypeId} from "../member-types/schemas.js";
import {PostType} from "./types/PostType.js";
import {ProfileType} from "./types/ProfileType.js";

export const query = new GraphQLObjectType<unknown, GraphQLContext>({
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
});