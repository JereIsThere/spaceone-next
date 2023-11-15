'use client'

import { Prisma } from '@prisma/client';
import { useRef } from 'react';
import { locationToString } from './LocationDisplay';
import { create } from './createFormAction';
import styles from './styles.module.css';

type EventFormProps = {
    locations: Prisma.locationsGetPayload<true>[]
}

export const EventForm = (props:EventFormProps) => {
    const formRef = useRef<HTMLFormElement>(null)

    const createCallback = async (formData: FormData)=>{
        await create(formData)
        formRef.current?.reset()
    }

    return (
        <div className={styles.eventRegisterContainer}>
            <form action={createCallback} ref={formRef} className={styles.eventForm} >
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" />
                </div>

                <div>
                    <label>Description: </label>
                    <input type="text" name="description" />
                </div>

                <div>
                    <label>Time: </label>
                    <input type="datetime-local" name="time" />
                </div>

                <div>
                    <label>Location: </label>
                    <select name='placeId'>
                        {props.locations.map(location=>
                            <option value={location.placeId}>{locationToString(location)}</option>
                            )}
                    </select>
                </div>

                <div>
                    <label>Link teams-Call: </label>
                    <input type="checkbox" name="hasTeamsCall" />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}