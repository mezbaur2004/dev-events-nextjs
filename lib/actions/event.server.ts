'use server'
import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model"

export const getEvents = unstable_cache(
    async () => {
        await connectDB();
        return Event.find().sort({ createdAt: -1 }).lean();
    },
    ["events"],
    { revalidate: 60 }
);

export const getEventBySlug = unstable_cache(
    async (slug: string) => {
        await connectDB();
        const event = await Event.findOne({ slug }).lean();

        return {event};
    },
    ["event-by-slug"], // static key
    { revalidate: 60 }  // in seconds
);