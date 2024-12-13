import { query } from "./_generated/server";
import { v } from "convex/values";


export const getMaterialData = query({
    args: {
      materialId: v.string(),
    },
    handler: async ({ db }, { materialId }) => {
      const material = await db
        .query("materials")
        .filter((q) => q.eq(q.field("id"), materialId))
        .first();
      return material ? material : null;
    },
  });