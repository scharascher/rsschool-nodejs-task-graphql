import { PrismaClient } from "@prisma/client";
import {GraphQLObjectType} from "graphql/index.js";
import {getDataLoaders} from "../dataLoader.js";

export type GraphQLContext = {
  db: PrismaClient;
  dataloaders: ReturnType<typeof getDataLoaders>
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GraphQLObjectTypeWithContext = GraphQLObjectType<any, GraphQLContext>;