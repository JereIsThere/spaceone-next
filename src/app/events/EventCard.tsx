type EventCardProps={
    name: string
    time: string 
    location: string
    description: string
}

const EventCard = (props: EventCardProps)=>{
    return (
        <div className="w-[300] h-[400] rounded-lg">
            <div className="name">{props.name}</div>
            <div className="time">{props.time}</div>
            <div className="location">{props.location}</div>
            <div className="description">{props.description}</div>
        </div>
    );
}

export default EventCard;