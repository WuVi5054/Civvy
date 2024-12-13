import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveUserData = mutation({
  args: {
    userId: v.string(),
  },
  handler: async ({ db }, { userId }) => {
    // Check if the user already exists
    const existingUser = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    // Generate dummy data
    const data = {
      timestamp: new Date().toISOString(),
      randomNumber: Math.floor(Math.random() * 1000),
    };

    if (existingUser) {
      // Update the existing user with new dummy data
      await db.patch(existingUser._id, { data });
      return { message: "User updated", data };
    } else {
      // Insert a new user with the dummy data
      await db.insert("users", { userId, data });
      return { message: "User created", data };
    }
  },
});

export const getUserData = query({
  args: {
    userId: v.string(),
  },
  handler: async ({ db }, { userId }) => {
    // Fetch the user data based on the provided userId
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    return user ? user.data : null;
  },
});
