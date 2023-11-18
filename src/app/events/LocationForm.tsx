'use client'

import { Location } from '@/util/typeDefs'
import React, { useEffect, useRef, useState } from 'react'
import { createLocation } from './createFormAction'
import styles from './styles.module.css'

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
        if (building == undefined || building == null)
            formData.set("building", "")

        setFormValues({})
        await createLocation(formData)
        formRef.current?.reset()
    }

    const locations = props.locations

    const [formValues, setFormValues] = useState<LocationData>({})
    const [autoCompleteSets, setAutoCompleteSets] = useState<AutocompleteLists>(getAutocompleteForEntry(formValues, locations))

    useEffect(() => {
        setAutoCompleteSets(getAutocompleteForEntry(formValues, props.locations))
    }, [props.locations])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event)
        const newFormValues = {
            ...formValues,
            [event.target.name]: event.target.value,
        }

        setFormValues(newFormValues);
        setAutoCompleteSets(getAutocompleteForEntry(newFormValues, locations))
    };

    console.log(JSON.stringify(autoCompleteSets, null, 3))

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
                <AutoCompleteList id="planet_list" values={autoCompleteSets.planets} />
                <AutoCompleteList id="country_list" values={autoCompleteSets.countries} />
                <AutoCompleteList id="zip_code_list" values={autoCompleteSets.zip_codes} />
                <AutoCompleteList id="city_list" values={autoCompleteSets.cities} />
                <AutoCompleteList id="street_list" values={autoCompleteSets.streets} />
                <AutoCompleteList id="street_number_list" values={autoCompleteSets.street_numbers} />
                <AutoCompleteList id="building_list" values={autoCompleteSets.buildings} />
                <AutoCompleteList id="room_list" values={autoCompleteSets.rooms} />

                <div>
                    <label>Planet: </label>()
                    <input list='planet_list' type="text" name="planet" required onChange={(e) => handleInputChange(e)} />
                </div>

                <div>
                    <label>Country: </label>
                    <input list='country_list' type="text" name="country" required onChange={(e) => handleInputChange(e)} />
                </div>

                <div>
                    <label>Zip Code: </label>
                    <input list='zip_code_list' type="text" name="zip_code" required onChange={(e) => handleInputChange(e)} />
                </div>

                <div>
                    <label>City: </label>
                    <input list='city_list' type="text" name="city" required onChange={(e) => handleInputChange(e)} />
                </div>

                <div>
                    <label>Street: </label>
                    <input list='street_list' type="text" name="street" required onChange={(e) => handleInputChange(e)} />
                </div>

                <div>
                    <label>Street Number: </label>
                    <input list='street_number_list' type="text" name="street_number" required onChange={(e) => handleInputChange(e)} />
                </div>

                <div>
                    <label>Building: </label>
                    <input list='building_list' type="text" name="building" onChange={(e) => handleInputChange(e)} />
                </div>

                <div>
                    <label>Room: </label>
                    <input list='room_list' type="text" name="room" required onChange={(e) => handleInputChange(e)} />
                </div>

                <button className={styles.submitButton} type="submit">Submit</button>
            </form>
        </div>
    )
}

type AutoCompleteListProps = {
    id: string,
    values: Array<string | null>
}
const AutoCompleteList = (props: AutoCompleteListProps) => {
    return (
        <datalist id={props.id}>
            {props.values.map((value, index) =>
                <option value={value?.toString()} key={`${index}:${value}`} />
            )}
        </datalist>
    )
}

type LocationData = Partial<Location>

type AutocompleteLists = {
    planets: Array<string>,
    countries: Array<string>,
    zip_codes: Array<string>,
    cities: Array<string>,
    streets: Array<string>,
    street_numbers: Array<string>,
    buildings: Array<string | null>,
    rooms: Array<string>,
}

function matchParam(a: LocationData[keyof LocationData], b: Location[keyof Location]) {
    return (a == b) || (a == "") || (b == "") || (a == undefined) || (b == undefined)
}

function isMatch(locationData: LocationData, location: Location): boolean {
    const a = locationData.country
    const b = location.country

    console.log(`comp: a:${a} b:${b} ... ${(a == b)} || ${a == ""}, ${b == ""}`)

    if (
        matchParam(locationData.planet, location.planet) &&
        matchParam(locationData.country, location.country) &&
        matchParam(locationData.zip_code, location.zip_code) &&
        matchParam(locationData.city, location.city) &&
        matchParam(locationData.street, location.street) &&
        matchParam(locationData.street_number, location.street_number) &&
        matchParam(locationData.building, location.building) &&
        matchParam(locationData.room, location.room)
    ) {
        return true
    } else {
        return false
    }
}

function getAutocompleteForEntry(locationData: LocationData, locations: Location[]): AutocompleteLists {
    const entriesForLocData = locations.filter((curLoc) => isMatch(locationData, curLoc))
    console.log("ENTRIES WITH MATCH: ", JSON.stringify(entriesForLocData, null, 2))

    const planets = [...new Set(entriesForLocData.map((loc) => loc.planet))]
    const countries = [...new Set(entriesForLocData.map((loc) => loc.country))]
    const zip_codes = [...new Set(entriesForLocData.map((loc) => loc.zip_code))]
    const cities = [...new Set(entriesForLocData.map((loc) => loc.city))]
    const streets = [...new Set(entriesForLocData.map((loc) => loc.street))]
    const street_numbers = [...new Set(entriesForLocData.map((loc) => loc.street_number))]
    const buildings = [...new Set(entriesForLocData.map((loc) => loc.building))]
    const rooms = [...new Set(entriesForLocData.map((loc) => loc.room))]

    // buildings.de

    return { planets, countries, zip_codes, cities, streets, street_numbers, buildings, rooms, }
}

export default LocationForm