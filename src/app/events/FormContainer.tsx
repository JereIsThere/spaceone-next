'use client'

import React, { useState } from 'react'
import { EventForm } from './EventForm'
import styles from './styles.module.css'
import { Location } from '@/util/typeDefs'
import LocationForm from './LocationForm'

type FormContainerProps = {
    locations: Location[]
}

const FormContainer = (props: FormContainerProps) => {
    const [showLocationForm, setShowLocationForm] = useState(false)
    const toggleShowLocationForm = ()=>{
        setShowLocationForm(!showLocationForm)
    }

    return (
        <div className={styles.formContainer}>
            <EventForm locations={props.locations} toggleLocationForm={toggleShowLocationForm} />
            <LocationForm locations={props.locations} showForm={showLocationForm}/>
        </div>
    )
}

export default FormContainer