import {GraphQLNonNull, GraphQLString} from "graphql";
import {UUIDType} from "./uuid.js";
import {GraphQLObjectTypeWithContext} from "./Context.js";

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