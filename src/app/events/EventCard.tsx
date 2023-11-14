import moment from 'moment'
import styles from './styles.module.css'
import { locationToString } from './LocationDisplay'
import { Prisma } from '@prisma/client'

type EventCardProps = {
    name: string
    time: Date
    location: Prisma.locationsGetPayload<true>
    description: string
}

const EventCard = (props: EventCardProps) => {
    const time = props.time

    const hours = time.getHours()
    const minutes = time.getMinutes()
    const day = time.getDay()
    const month = time.getMonth()
    const year = time.getFullYear()

    const timeStr = `${hours}:${minutes}, ${day}.${month}.${year}` 

    return (
        <div className={styles.eventCard}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.time}>{timeStr}</div>
            <div className={styles.location}>{locationToString(props.location)}</div>
            <hr />
            <div className={styles.description}>{props.description}</div>
        </div>
    );
}

export default EventCard;