import moment from 'moment'
import styles from './styles.module.css'
import { Prisma } from '@prisma/client'
import { Part, getTimeString, locationToString } from '@/util/stringConverter'
import { Location } from '@/util/typeDefs'

type EventCardProps = {
    name: string
    time: Date
    location: Location
    description: string
}

const EventCard = (props: EventCardProps) => {
    const timeStr = getTimeString(props.time)
    const locationFirstPart = locationToString(props.location, Part.FIRST)
    const locationSecondPart = locationToString(props.location, Part.SECOND)

    return (
        <div className={styles.eventCard}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.time}>{timeStr}</div>
            <div className={styles.location}>{locationFirstPart}</div>
            <div className={styles.location}>{locationSecondPart}</div>
            <hr />
            <div className={styles.description}>{props.description}</div>
        </div>
    );
}

export default EventCard;