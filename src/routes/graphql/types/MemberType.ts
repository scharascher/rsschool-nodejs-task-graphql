import {GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType} from "graphql/index.js";
import {GraphQLNonNull} from "graphql";

const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});
export const MemberType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: {type: new GraphQLNonNull(MemberTypeId)},
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: {type: new GraphQLNonNull(GraphQLInt)},
  })
})