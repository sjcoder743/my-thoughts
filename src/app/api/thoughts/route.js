// src/app/api/thoughts/route.js
import { auth } from "@clerk/nextjs/server";
import dbConnect from "../../../../lib/mongodb"; // Adjust path if necessary based on your actual structure
import Thought from "../../../../models/Thought"; // Adjust path if necessary

// DEBUGGING LOG - REMOVE THIS LINE AFTER IT WORKS
console.log(
  "DEBUG: CLERK_SECRET_KEY value seen by API route:",
  process.env.CLERK_SECRET_KEY ? "******" : "NOT SET OR UNDEFINED"
);

export async function GET(request) {
  await dbConnect();
  const { userId } = auth();

  console.log("GET /api/thoughts - Server-side userId:", userId);

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const thoughts = await Thought.find({ userId }).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, data: thoughts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  const { userId } = auth();

  console.log("--- Clerk Auth Debugging (POST /api/thoughts) ---");
  console.log("Server-side userId before check:", userId);
  console.log("--------------------------------------------------");

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const body = await request.json();
    const thought = await Thought.create({ ...body, userId });

    return new Response(JSON.stringify({ success: true, data: thought }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return new Response(
        JSON.stringify({ success: false, message: messages.join(", ") }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
