import ExploreBtn from "@/component/explore-btn";
import EventCard from "@/component/event-card";
import {events} from "@/lib/constants";




const Home = () => {

    return (
        <section  >
            <h1 className={'text-center'}> The Hub for Every Dev <br /> Event you can&apos;t miss </h1>
            <p className={'text-center mt-5'} > Hackathons, Meetups, and Conference all in one place </p>
            <ExploreBtn />
            <div className={'mt-20 space-y-7'}>
                <h3> Featured Events </h3>
                <ul className={'events'}>
                    {
                        events.map((event) => (
                            <EventCard
                                key={event.title}
                                event={event}
                            />
                        ))
                    }

                </ul>
            </div>
        </section>
    )
}
export default Home
