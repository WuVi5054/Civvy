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
      exp: 0,
      material_completed: [],
    };

    if (!existingUser) {
      // Insert a new user with the dummy data
      await db.insert("users", { userId, ...data });
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

    return user ? user : null;
  },
});

export const updateUserExp = mutation({
  args: {
    userId: v.string(),
    exp: v.number(),
  },
  handler: async ({ db }, { userId, exp }) => {
    const existingUser = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (existingUser) {
      const newExp = existingUser.exp + exp;
      await db.patch(existingUser._id, { exp: newExp });
      return { message: "User exp updated", exp };
    } else {
      return { message: "User not found" };
    }
  },
});


export const updateMaterialComplete = mutation({
  args: {
    userId: v.string(),
    materialId: v.string(),
  },
  handler: async ({ db }, { userId, materialId }) => {
    const existingUser = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (existingUser) {
      const newMaterial = [...existingUser.material_completed, materialId];
      await db.patch(existingUser._id, { material_completed: newMaterial });
      return { message: "User material updated", newMaterial };
    } else {
      return { message: "User not found" };
    }
  },
});