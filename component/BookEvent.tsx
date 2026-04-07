"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";
import posthog from "posthog-js";

const BookEvent = ({ eventId }: { eventId: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const { success, error } = await createBooking({ eventId, email });
    if (success) {
        
        posthog.capture('event_booked', { event_id: eventId, email});
      setSubmitted(true);
      alert('Booked successfully');
    } else {
        posthog.captureException(error);
      console.log(error);
      alert(error);
    }
  };

  return (
    <div id={"book-event"}>
      {submitted ? (
        <p> Thank you for signing up! </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor={"email"}>Email</label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder={"Email"}
              type={"email"}
              required={true}
            />
          </div>
          <button type={"submit"} className={"button-submit"}>
            {" "}
            Submit{" "}
          </button>
        </form>
      )}
    </div>
  );
};
export default BookEvent;
