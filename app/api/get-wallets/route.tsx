import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const wallets = await prisma.wallet.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json(wallets, { status: 200 });
}
