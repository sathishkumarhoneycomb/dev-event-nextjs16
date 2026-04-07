import React from 'react'
import {notFound} from "next/navigation";
import Image from "next/image";
import BookEvent from "@/component/BookEvent";
import {getSimilarEvents} from "@/lib/actions/event.action";
import {IEvent} from "@/database";
import EventCard from "@/component/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const EventDetailItem = ({label, icon, alt}: {label: string, icon: string, alt: string}) => (
    <div className={'flex-row-gap-2 items-center'}>
        <Image src={icon} alt={alt} height={17} width={17} />
        <p> {label} </p>
    </div>
)

const EventAgendaItems = ({agendaItems}: {agendaItems: string[]}) => (
    <div className={'agenda'}>
        <h2> Agenda </h2>
        <ul>
            {agendaItems.map((agendaItem: string) => (<li key={agendaItem}> {agendaItem} </li>))}
        </ul>

    </div>
)

const EventTags = ({tags}: {tags: string[]}) => (
    <div className={'flex flex-row gap-1.5 flex-wrap'}>
        {tags.map((tag: string) => (<div key={tag} className={'pill'}> {tag} </div>))}
    </div>
)

const Page = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    let event;
    try {
        const url = `${BASE_URL}/api/events/${slug}`;
        const req: Response = await fetch(url, {
            next: {revalidate: 60}
        });
        if(!req.ok) {
            if(req.status === 404) {
                return notFound();
            }
            throw new Error(`Failed to fetch event: ${req.statusText}`);
        }
        const res = await req.json();
        event = res?.event;
        if(!event) return notFound();
    }catch (e) {
        console.log(e)
        return notFound();
    }

    const { agenda, audience, date, description, image, location, mode, organizer, overview,tags, time,title, venue } = event;

    const bookings  = 10;

    const similarEvents: IEvent[] = await getSimilarEvents(slug);


    return (
        <section id="event">
            <div className={'header'}>
                <h1> {title} </h1>
                <p> {description} </p>
                <div className={'details'}>
                    <div className={'content'}>
                        <Image src={image} alt={'Event Image'} height={800} width={800} />
                        <section className={'flex-col-gap-2'}>
                            <h2> Event Details </h2>
                            <EventDetailItem icon={'/icons/calendar.svg'} label={date} alt={"Date"}  />
                            <EventDetailItem icon={'/icons/clock.svg'} label={time} alt={"Time"}  />
                            <EventDetailItem icon={'/icons/pin.svg'} label={location} alt={"Location"}  />
                            <EventDetailItem icon={'/icons/mode.svg'} label={mode} alt={"Mode"}  />
                            <EventDetailItem icon={'/icons/audience.svg'} label={audience} alt={"Audience"}  />
                        </section>
                        <EventAgendaItems agendaItems={agenda} />
                        <section className={'flex-col-gap-2'}>
                            <h2> About the organizer </h2>
                            <p> {organizer} </p>
                        </section>
                        <EventTags tags={tags} />
                    </div>
                    <aside className={'booking'}>
                        <div className={'signup-card'}>
                            <h2> Book your spot </h2>
                            <p>
                                {
                                    bookings > 0 ? `Join ${bookings} people who have already booked their spot` : "Be the first to book your spot"
                                }
                            </p>

                            <BookEvent eventId={event._id} />
                        </div>
                    </aside>
                </div>
            </div>
            <div className={'flex flex-col gap-4 pt-20 w-full'}>
                <h2> Similar Events </h2>
                <div className={'events'}>
                    {
                        similarEvents.map(event => <EventCard
                            key={event.title}
                            event={event} />)
                    }
                </div>
            </div>
        </section>
    )
}
export default Page;
