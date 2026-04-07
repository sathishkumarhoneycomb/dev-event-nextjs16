import ExploreBtn from "@/component/ExploreBtn";
import EventCard from "@/component/EventCard";
import { IEvent } from "@/database";

import { getEvents } from "@/lib/actions/event.action";

const Home = async () => {
    "use cache"
  const { success, events } = await getEvents();
  if (!success) {
    console.log("Failed to fetch the events");
  }

  return (
    <section>
      <h1 className={"text-center"}>
        {" "}
        The Hub for Every Dev <br /> Event you can&apos;t miss{" "}
      </h1>
      <p className={"text-center mt-5"}>
        {" "}
        Hackathons, Meetups, and Conference all in one place{" "}
      </p>
      <ExploreBtn />
      <div className={"mt-20 space-y-7"}>
        <h3> Featured Events </h3>
        <ul className={"events list-none"}>
          {events.map((event: IEvent) => (
            <li key={event.title}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Home;
