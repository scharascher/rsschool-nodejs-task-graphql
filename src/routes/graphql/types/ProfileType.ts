import {GraphQLBoolean, GraphQLNonNull, GraphQLObjectType} from "graphql";
import {UUIDType} from "./uuid.js";

export const ProfileType = new GraphQLObjectType({
  name: "ProfileType",
  fields: () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLBoolean)},
    userId: {type: new GraphQLNonNull(UUIDType)},
    memberTypeId: {type: new GraphQLNonNull(UUIDType)},
  })
})