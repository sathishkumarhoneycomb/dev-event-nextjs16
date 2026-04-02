import Link from "next/link";
import Image from "next/image";

interface  Props {
    title: string;
    image: string;
    location: string;
    date: string;
    time: string;
    slug: string;
}

const EventCard = ({event}: {event: Props}) => {
    return (
        <Link href={`/events/${event.slug}`} id={'event-card'}>
            <Image src={event.image} alt={event.title} width={410} height={300} className={'poster'} />
            <div className={'flex flex-row gap-2'} >
                <Image src={'/icons/pin.svg'} alt={"Location"} width={14} height={14} />
                <p> {event.location} </p>
            </div>
            <p className={'title'}> {event.title} </p>
            <div className={'datetime'}>
                <div>
                    <Image src={'/icons/calendar.svg'} alt={'Calendar'} height={14} width={14} />
                    <p> {event.date} </p>
                </div>
                <div>
                    <Image src={'/icons/clock.svg'} alt={'Clock'} height={14} width={14} />
                    <p> {event.time} </p>
                </div>
            </div>
        </Link>
    )
}
export default EventCard
