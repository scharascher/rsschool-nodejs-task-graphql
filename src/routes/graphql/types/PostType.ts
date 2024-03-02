import {GraphQLNonNull, GraphQLString} from "graphql";
import {UUIDType} from "./uuid.js";
import {GraphQLContext, GraphQLObjectTypeWithContext} from "./Context.js";
import {GraphQLBoolean, GraphQLInputObjectType, GraphQLInt} from "graphql/index.js";
import {MemberTypeIdField} from "./MemberType.js";

export const PostType = new GraphQLObjectTypeWithContext({
  name: "PostType",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      resolve: ({id}: {id: string}, _, {db}) => {
        return db.user.findUnique({where: {id}});
      }
    }
  })
})

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    authorId: {type: new GraphQLNonNull(UUIDType)}
  })
})
export type CreatePostDto = {
  title: string;
  content: string;
  authorId: string;
}

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    authorId: {type: UUIDType}
  }),
});