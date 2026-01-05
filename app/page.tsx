'use server'
import React from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";
import {getEvents} from "@/lib/actions/event.server";

export default async function Page  ()  {
    const events = await getEvents();
    return (
        <div>
            <section>
                <h1 className="text-center">The Hub for Every Developer <br/> Event You Can't Miss</h1>
                <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
                <div className="flex justify-center mt-8">
                    <ExploreBtn />
                </div>

                <div className="mt-20 space-y-7">
                    <h3>Featured Events</h3>
                    <ul className="events">
                        {events && events.length>0 && events.map((event:IEvent)=>(
                             <EventCard key={event.title} {...event} />
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}