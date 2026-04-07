"use server";

import connectDB from "@/lib/mongodb";
import {Event} from "@/database/index";




export const getEvents = async () => {
    await connectDB();
    try {
        const events = await Event.find().sort({createdAt: -1});
        return {success: true, events: JSON.parse(JSON.stringify(events))};
    } catch (error) {
        console.log(error);
        return {success: false, error: error instanceof Error ? error.message : typeof error == "string" ? error : "Server Error"};
    }
}


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