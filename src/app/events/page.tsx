import { useState, useEffect } from "react";
import EventCard from "./EventCard"
import './eventPageStyle.css'

type EventPage = {}

const EventPage = (props: EventPage) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    
    fetch('http://localhost:3000/add_user', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 11,
            first_name: "Ulrich",
            last_name: "auch Ulrich",
            roleId: 55
        })
    }).then(response => response.json()).then(data => {
        window.alert(data)
        //Do anything else like Toast etc.
    })

    return (<>
        <div className="cardContainer">
            {/* {data.map(item => (
                <div key={item.id}>{item.value}</div>
            ))} */}
            <EventCard name="testEvent" description="description hell yeah" location="Am Trotz 20, '58, Erde" time="Nov-13 25:00" />
            <EventCard name="testEvent2" description="even longer description as a test yeah" location="Am Trotz 20, '58, Erde" time="Nov-13 25:00" />
        </div>
    </>)
}

export default EventPage