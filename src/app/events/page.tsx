import { prisma } from "@/components/prisma";
import { getServerSession } from "next-auth/next";
import { ACTIONS, SITE, UnauthorizedPage, checkAuthForAction } from "../auth/checkAuthForAction";
import { authOptions } from "../auth/nextauth";
import EventCard from "./EventCard";
import FormContainer from "./FormContainer";
import styles from "./styles.module.css";
import { Location } from "@/util/typeDefs";

type EventPage = {}

const EventPage = async (props: EventPage) => {
    const session = await getServerSession(authOptions)

    const canView = checkAuthForAction(session?.user, SITE.EVENTS, ACTIONS.VIEW)
    const canEdit = checkAuthForAction(session?.user, SITE.EVENTS, ACTIONS.EDIT)

    console.log(`user ${JSON.stringify(session?.user)}, cv:${canView}, ce:${canEdit}`)

    if (!canView)
        return <UnauthorizedPage user={session?.user} />

    const events = await prisma.events.findMany({ include: { place: true }, orderBy: { eventId: "asc" } })
    const locations = await prisma.locations.findMany()

    return (<>
        {(canEdit) ? <FormContainer locations={locations} /> : <></>}
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

// {(canEdit) ?  <EventForm locations={locations}/> : <></>}
//{(canEdit) ? <LocationForm locations={locations} /> : <></>}

export default EventPage