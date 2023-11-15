import { prisma } from "@/components/prisma";
import EventCard from "./EventCard";
import EventFormTest from "./EventFormTest";
import EventFormTest2 from "./EventFormTest2";
import { EventForm } from "./EventForm";
import { LocationDisplay } from "./LocationDisplay";

type EventPage = {}

const EventPage = async (props: EventPage) => {
    const events = await prisma.events.findMany({include: {place: true}})
    const locations = await prisma.locations.findMany()

    return (<>
        <EventForm locations={locations}/>
        {/* <LocationDisplay locations={locations} /> */}
        {/* <EventFormTest /> */}
        {/* <EventFormTest2 onSuccess={() => window.alert("Successfully added!")} /> */}
        <div className="cardContainer">
            {/* <EventCard name="testEvent" description="this is a debug card, it's always here." location="Am Trotz 20, '58, Erde" time={new Date()} />
            <EventCard name="testEvent2" description="second debug card!!" location="Am Trotz 20, '58, Erde" time={new Date()} /> */}
            {events.map(event =>
                <EventCard
                    name={event.name}
                    description={event.description ?? ""}
                    location={event.place}
                    time={event.time}
                />
            )}
        </div>
    </>)
}

export default EventPage