"use server"
import { Booking } from "@/database"
export const createBooking = async ({eventId, email}: {eventId: string; email: string}) => {
    try {
         if(!eventId || !email) throw new Error('Event Id And Email are Required');
         const newBooking = await Booking.create({eventId, email});
         return {success: true, booking: JSON.parse(JSON.stringify(newBooking))};

    } catch (error) {
        console.log(error);
        return {success: false, error: error instanceof Error ?  error.message: typeof error == "string" ? error : "Server Error"};
    }

}