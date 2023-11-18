'use client'

import { Prisma } from '@prisma/client';
import { useRef } from 'react';
import { createEvent } from './createFormAction';
import styles from './styles.module.css';
import { Part, locationToString } from '@/util/stringConverter';

type EventFormProps = {
    locations: Prisma.locationsGetPayload<true>[],
    toggleLocationForm: () => void
}

export const EventForm = (props:EventFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)

    const createCallback = async (formData: FormData)=>{
        await createEvent(formData)
        formRef.current?.reset()
    }

    return (
        <div className={styles.eventRegisterContainer}>
            <form action={createCallback} ref={formRef} className={styles.eventForm} >
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" required />
                </div>

                <div>
                    <label>Description: </label>
                    <input type="text" name="description" required/>
                </div>

                <div>
                    <label>Time: </label>
                    <input type="datetime-local" name="time" required />
                </div>

                <div className={styles.locationsContainer}>
                    <label>Location: </label>
                    <select name='placeId' required>
                        {props.locations.map(location=>
                            <option value={location.placeId} key={location.placeId}>{locationToString(location, Part.BOTH)}</option>
                            )}
                    </select>
                    <img src="/ic_add.png" className={styles.addButton} onClick={()=>props.toggleLocationForm()}/>
                </div>

                <div>
                    <label>Link teams-Call: </label>
                    <input type="checkbox" name="hasTeamsCall" />
                </div>

                <button className={styles.submitButton}  type="submit">Submit</button>
            </form>
        </div>
    );
}