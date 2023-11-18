'use client'

import React, { useRef } from 'react'
import styles from './styles.module.css'
import { createEvent, createLocation } from './createFormAction'
import { Prisma } from '@prisma/client'
import { Location } from '@/util/typeDefs'

type LocationFormProps = {
    locations: Location[],
    showForm: boolean
}

const LocationForm = (props: LocationFormProps) => {
    if (!props.showForm)
        return <></>

    const formRef = useRef<HTMLFormElement>(null)

    const createCallback = async (formData: FormData) => {
        const building = formData.get("building")
        if(building == undefined || building == null)
            formData.set("building", "")

        await createLocation(formData)
        formRef.current?.reset()
    }

    const locations = props.locations
    const acl = getAutocompleteForEntry(locations[0], locations)

    

    return (
        <div className={styles.eventRegisterContainer}>
            <form action={createCallback} ref={formRef} className={styles.eventForm}>
                {/* planet        
                country       
                zip_code      
                city          
                street        
                street_number 
                building      
                room */}
                {/* <AutoCompleteList id="planet_list" values={ acl.planets} />
                <AutoCompleteList id="country_list" values={acl.countries}/>
                <AutoCompleteList id="zip_code_list" values={acl.zip_codes}/>
                <AutoCompleteList id="city_list" values={acl.cities}/>
                <AutoCompleteList id="street_list" values={acl.streets}/>
                <AutoCompleteList id="street_number_list" values={acl.street_numbers}/>
                <AutoCompleteList id="building_list" values={acl.buildings}/>
                <AutoCompleteList id="room_list" values={acl.rooms}/> */}

                <div>
                    <label>Planet: </label>
                    <input list='planet_list' type="text" name="planet" required />
                </div>

                <div>
                    <label>Country: </label>
                    <input list='country_list' type="text" name="country" required />
                </div>

                <div>
                    <label>Zip Code: </label>
                    <input list='zip_code_list'type="text" name="zip_code" required />
                </div>

                <div>
                    <label>City: </label>
                    <input list='city_list' type="text" name="city" required />
                </div>

                <div>
                    <label>Street: </label>
                    <input list='street_list' type="text" name="street" required />
                </div>

                <div>
                    <label>Street Number: </label>
                    <input list='street_number_list' type="text" name="street_number" required />
                </div>

                <div>
                    <label>Building: </label>
                    <input list='building_list' type="text" name="building" />
                </div>

                <div>
                    <label>Room: </label>
                    <input list='room_list' type="text" name="room" required />
                </div>

                <button className={styles.submitButton} type="submit">Submit</button>
            </form>
        </div>
    )
}

type AutoCompleteListProps = {
    id: string,
    values: Set<string | null>
}
const AutoCompleteList = (props: AutoCompleteListProps) => {
    return (
        <datalist id={props.id}>
            {[...props.values].map((value) =>
                <option value={value?.toString()} key={value?.toString()} />
            )}
        </datalist>
    )
}

type AutocompleteSets = {
    planets: Set<string>,
    countries: Set<string>,
    zip_codes: Set<string>,
    cities: Set<string>,
    streets: Set<string>,
    street_numbers: Set<string>,
    buildings: Set<string | null>,
    rooms: Set<string>,
}

function getAutocompleteForEntry(locationData: Location, locations: Location[]): AutocompleteSets {
    const planets = new Set(locations.map((loc) => loc.planet))
    const countries = new Set(locations.map((loc) => loc.country))
    const zip_codes = new Set(locations.map((loc) => loc.zip_code))
    const cities = new Set(locations.map((loc) => loc.city))
    const streets = new Set(locations.map((loc) => loc.street))
    const street_numbers = new Set(locations.map((loc) => loc.street_number))
    const buildings = new Set(locations.map((loc) => loc.building))
    const rooms = new Set(locations.map((loc) => loc.room))

    buildings.delete(null)

    return { planets, countries, zip_codes, cities, streets, street_numbers, buildings, rooms, }
}

export default LocationForm