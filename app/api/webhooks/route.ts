import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/prisma/db";
export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  if (eventType === "user.created") {
    try {
      console.log("User data:", {
        userId: evt.data.id,
        email: evt.data.email_addresses[0].email_address,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
        image: evt.data.image_url,
      });

      await prisma.user.create({
        data: {
          userId: evt.data.id,
          email: evt.data.email_addresses[0].email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          image: evt.data.image_url,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response(
        `${error as string} there was an error creating the user`,
        {
          status: 400,
        }
      );
    }
  }
  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({
        where: {
          userId: evt.data.id,
        },
      });
    } catch (error) {
      return new Response(error as string, {
        status: 400,
      });
    }
  }
  if (eventType === "user.updated") {
    try {
      await prisma.user.update({
        where: {
          userId: evt.data.id,
        },
        data: {
          email: evt.data.email_addresses[0].email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          image: evt.data.image_url,
        },
      });
    } catch (error) {
      return new Response(error as string, {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}
