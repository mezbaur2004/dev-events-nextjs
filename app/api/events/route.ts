import {NextRequest, NextResponse} from "next/server";
import {v2 as cloudinary} from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model'

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const formData=await req.formData();
        let event;
        try{
            event=Object.fromEntries(formData.entries());
        }catch(e){
            return NextResponse.json({message:"Invalid form data"},{status:400});
        }
        // Grabs the uploaded image from the form.
        // Converts it to a Node.js Buffer.
        // Uploads it to Cloudinary via a stream.
        // Saves the returned URL into your event object for database storage.
        const file=formData.get('image') as File;
        if(!file){
            return NextResponse.json({message:"No image uploaded",status:400});
        }
        const arrayBuffer=await file.arrayBuffer()
        const buffer=Buffer.from(arrayBuffer);
        const uploadResult=await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({resource_type:'image',folder:'dev-events-nextjs'},(error,result)=>{
                if(error){
                    return reject(error);
                }
                resolve(result);
            }).end(buffer)
        })

        event.image=(uploadResult as {secure_url:string}).secure_url;

        const createdEvent = await Event.create(event);
        return NextResponse.json({message:'Event created successfully',event: createdEvent},{status:201})
    }catch (e) {
        return NextResponse.json({message:'Event Creation Failed',error:e instanceof Error? e.message:'Unknown Error'});
    }
}

export async function GET(){
    try{
        await connectDB();
        const events=await Event.find().sort({createdAt:-1});
        return NextResponse.json({message:'Events fetched successfully',events},{status:200});
    }catch (e) {
        return NextResponse.json({message:'Event fetching Failed',error:e instanceof Error? e.message:'Unknown Error'});
    }
}