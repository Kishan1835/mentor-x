import { currentUser, EmailAddress } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      // console.error("No user is currently logged in.");
      return null;
    }

    try {
      const LoggedInUser = await db.user.findUnique({
        where: {
          clerkUserid: user.id,
        },
      });

      if (LoggedInUser) {
        return LoggedInUser;
      }

      const name = `${user.firstName} ${user.lastName}`;
      const NewUser = await db.user.create({
        data: {
          clerkUserid: user.id,
          name,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });

      return NewUser;
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return null; // or handle the error as needed
  }
};
