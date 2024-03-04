import {PrismaClient} from "@prisma/client";
import DataLoader from "dataloader";
import {MemberTypeId} from "../member-types/schemas.js";

export const userDataLoader = (db: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const users = await db.user.findMany({
      where: { id: { in: ids as string[] } },
      include: { userSubscribedTo: true, subscribedToUser: true },
    });

    return ids.map((id) => users.find((user) => user.id === id));
  });
};

export const profileDataLoader = (prismaClient: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const profiles = await prismaClient.profile.findMany({
      where: { userId: { in: ids as string[] } },
    });

    return ids.map((id) =>
      profiles.find((profile) => profile.userId === id),
    );
  });
};

export const postDataLoader = (db: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const posts = await db.post.findMany({
      where: { authorId: { in: ids as string[] } },
    });

    return ids.map((id) => posts.filter((post) => post.authorId === id));
  });
};

export const memberTypeDataLoader = (db: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const memberTypes = await db.memberType.findMany({
      where: { id: { in: ids as MemberTypeId[]} },
    });

    return ids.map((id) =>
      memberTypes.find((memberType) => memberType.id === id),
    );

  });
};

export const getDataLoaders = (db: PrismaClient) => {
  return {
    user: userDataLoader(db),
    profile: profileDataLoader(db),
    post: postDataLoader(db),
    memberType: memberTypeDataLoader(db),
  };
};

