import {NextRequest, NextResponse} from "next/server";
import {Event} from "@/database/index";
import {v2 as cloudinary} from "cloudinary";
import connectDB from "@/lib/mongodb";
import { revalidateTag } from "next/cache";


export  async function POST(req: NextRequest){
    try {
        await connectDB();

        revalidateTag('events', "max");
        const formData = await req.formData();
        let event;
        try {
            event = Object.fromEntries(formData);
        } catch {
            return NextResponse.json({message: "Invalid JSON Format"},{status: 400});
        }

        const tags = JSON.parse(formData.get('tags') as string);
        const agenda = JSON.parse(formData.get('agenda') as string);

        const file  = formData.get('image') as File;
        if(!file) return NextResponse.json({message: "Image is required"},{status: 400});

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'DevEvent'},(error,results) => {
                if(error) return reject(error);
                resolve(results);
            }).end(buffer);
        });
        event.image = (uploadResult as {secure_url: string}).secure_url;

        const createdEvent = await Event.create({...event, tags, agenda});
        return NextResponse.json({ message: "Event Successfully Created", event: createdEvent },{status: 201})
    }catch (e) {
        console.log(e)
        return NextResponse.json({message: 'Event Creation Failed', error: e instanceof Error ? e.message : "Unknown"},{status: 500});
    }
}

export async function GET(req: NextRequest){
    try {
        await connectDB();
        const events = await Event.find().sort({createdAt: -1});
        return NextResponse.json({message: "Event List Successfully Fetched", events},{status: 200});
    }catch (e) {
        console.log(e);
        return NextResponse.json({message: "Event Fetching Failed", error: e instanceof Error ? e.message : 'Unknown'});
    }
}