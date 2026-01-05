import Image from "next/image";
import { notFound } from "next/navigation";
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getEventBySlug } from "@/lib/actions/event.server";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";

const EventDetailItem = ({ icon, alt, label }: {
    icon: string;
    alt: string;
    label: string;
}) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
);

export default async function EventPageContent({ slug }: { slug: string }) {
    const { success, event } = await getEventBySlug(slug);

    if (!success || !event) {
        notFound();
    }

    const {
        title,
        description,
        image,
        overview,
        date,
        time,
        location,
        mode,
        agenda,
        audience,
        tags,
        organizer,
    } = event;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
        <section id="event">
            <div className="header">
                <h1>Event Details:<br />{title}</h1>
                <p>{description}</p>
            </div>

            <div className="details">
                <div className="content">
                    <Image src={image} alt={title} width={800} height={800} />

                    <section>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section>
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                    </section>
                </div>

                <aside className="booking">
                    <BookEvent />
                </aside>
            </div>

            <section>
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.map(event => (
                        <EventCard key={event.slug} {...event} />
                    ))}
                </div>
            </section>
        </section>
    );
}
