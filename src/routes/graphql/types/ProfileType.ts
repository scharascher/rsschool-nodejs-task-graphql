import {GraphQLBoolean, GraphQLNonNull, GraphQLObjectType} from "graphql";
import {UUIDType} from "./uuid.js";
import {MemberType} from "./MemberType.js";
import {GraphQLObjectTypeWithContext} from "./Context.js";
import {MemberTypeId} from "../../member-types/schemas.js";

export const ProfileType = new GraphQLObjectTypeWithContext({
  name: "ProfileType",
  fields: () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLBoolean)},
    userId: {
      type: new GraphQLNonNull(UUIDType),
      resolve: ({id}: {id: string}, _, {db}) => {
        return db.user.findUnique({where: {id}});
      }
    },
    memberType: {type: MemberType,
      resolve: async ({memberTypeId}: {memberTypeId: MemberTypeId}, _, {db}) => {
        return db.memberType.findUnique({where: {id: memberTypeId}});
      } },
  })
})