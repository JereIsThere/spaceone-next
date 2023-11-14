'use client'

import { prisma } from '@/components/prisma';
import z from 'zod';
import { zfd } from 'zod-form-data';
import styles from './styles.module.css';
import { revalidatePath } from 'next/cache';
import {create} from './createFormAction'
import { useRef } from 'react';
import { Prisma } from '@prisma/client';
import { locationToString } from './LocationDisplay';

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
            <form action={createCallback} ref={formRef} style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                maxWidth: '400px',
                margin: '0 auto',
            }} >
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