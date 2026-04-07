"use server";

import connectDB from "@/lib/mongodb";
import {Event} from "@/database/index";

export const getSimilarEvents = async (slug: string) => {
    await connectDB();
    try {
        const event = await Event.findOne({slug});
        if(!event) return [];
        const events =  await Event.find({_id: {$ne: event._id}, tags: {$in: event.tags }}).lean();
        return JSON.parse(JSON.stringify(events));
    } catch  {
        return [];
    }
}