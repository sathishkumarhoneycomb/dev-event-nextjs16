import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import {Event} from "@/database/index";

export async function GET(request: NextRequest, {params}: {params: Promise<{slug: string}>}){
    const { slug } = await params;
    const santizedSlug = slug.trim().toLowerCase();
    try {
        await connectDB();
        const event = await Event.findOne({slug});
        if(!event) {
            return NextResponse.json({message: "Event with the slug not found"}, {status: 404});
        }
        return NextResponse.json({message: "Event Fetched Successfully", event}, {status: 200});
    }catch(err){
        console.error(err);
        return NextResponse.json({message: "Failed to fetch the event", error: err instanceof Error ? err.message : "Unknown error"}, {status: 500});
    }
}