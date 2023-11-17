import { prisma } from "@/components/prisma";
import EventCard from "./EventCard";
import EventFormTest from "./EventFormTest";
import EventFormTest2 from "./EventFormTest2";
import { EventForm } from "./EventForm";
import { LocationDisplay } from "./LocationDisplay";
import styles from "./styles.module.css";
import { ACTIONS, SITE, UnauthorizedPage, checkAuthForAction, checkAuthForEdit } from "../auth/checkAuthForAction";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/nextauth"

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
                />
            )}
        </div>
    </>)
}

export default EventPage