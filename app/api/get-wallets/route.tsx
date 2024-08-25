import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma/db";

async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const wallets = await prisma.wallet.findMany({
    where: {
      userId,
    },
  });

  return new Response(JSON.stringify(wallets), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
