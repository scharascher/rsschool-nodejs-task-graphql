import { PrismaClient } from "@prisma/client";
import {GraphQLObjectType} from "graphql/index.js";

export type GraphQLContext = {
  db: PrismaClient;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GraphQLObjectTypeWithContext = GraphQLObjectType<any, GraphQLContext>;