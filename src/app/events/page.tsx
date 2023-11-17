import { prisma } from "@/components/prisma";
import { getServerSession } from "next-auth/next";
import { ACTIONS, SITE, UnauthorizedPage, checkAuthForAction } from "../auth/checkAuthForAction";
import { authOptions } from "../auth/nextauth";
import EventCard from "./EventCard";
import { EventForm } from "./EventForm";
import styles from "./styles.module.css";

type EventPage = {}

const EventPage = async (props: EventPage) => {
    const session = await getServerSession(authOptions)

    const canView = checkAuthForAction(session?.user, SITE.EVENTS, ACTIONS.VIEW)
    const canEdit = checkAuthForAction(session?.user, SITE.EVENTS, ACTIONS.EDIT)

    if(!canView)
        return <UnauthorizedPage user={session?.user}/>

    const events = await prisma.events.findMany({include: {place: true}, orderBy: { eventId: "asc" }})
    const locations = await prisma.locations.findMany()

    return (<>
       {(canEdit) ?  <EventForm locations={locations}/> : <></>}
        <div className={styles.cardContainer}>
            {events.map(event =>
                <EventCard
                    name={event.name}
                    description={event.description ?? ""}
                    location={event.place}
                    time={event.time}
                    key={event.eventId}
                />
            )}
        </div>
    </>)
}

export default EventPage