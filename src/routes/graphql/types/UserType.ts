import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {UUIDType} from "./uuid.js";

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: {type: new GraphQLNonNull(GraphQLInt)},
    id: {type: new GraphQLNonNull(UUIDType)}
  })
})
