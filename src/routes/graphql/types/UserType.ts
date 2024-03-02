import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {UUIDType} from "./uuid.js";
import {ProfileType} from "./ProfileType.js";
import {PostType} from "./PostType.js";
import {GraphQLContext, GraphQLObjectTypeWithContext} from "./Context.js";
import {GraphQLFloat} from "graphql/index.js";

export const UserType = new GraphQLObjectTypeWithContext({
  name: "UserType",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: {type: new GraphQLNonNull(GraphQLFloat)},
    id: {type: new GraphQLNonNull(UUIDType)},
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async (args: { id: string }, _, {db}) => {
        return await db.profile.findUnique({where: {userId: args.id}});
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ( { id }: { id: string }, _, {db}) =>
        db.post.findMany({ where: { authorId: id } }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ( { id }: { id: string }, _, {db}) =>
        db.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        }),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: { id: string }, _, {db}) =>
        db.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        }),
    },
  })
}) as GraphQLObjectType;
