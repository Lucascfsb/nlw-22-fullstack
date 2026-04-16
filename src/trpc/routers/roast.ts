import { avg, count } from "drizzle-orm";
import { roasts } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "../init";

export const roastRouter = createTRPCRouter({
  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        totalRoasts: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts);

    const totalRoasts = Number(stats?.totalRoasts ?? 0);
    const avgScore = Number(stats?.avgScore ?? 0);

    return { totalRoasts, avgScore };
  }),
});
