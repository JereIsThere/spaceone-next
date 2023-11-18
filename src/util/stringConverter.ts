import { Location } from "./typeDefs"

export const getTimeString = (time: Date): string => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const day = time.getDay()
    const month = time.getMonth()
    const year = time.getFullYear()

    return `${hours}:${minutes}, ${day}.${month}.${year}`
}

export enum Part {
    FIRST,
    SECOND,
    BOTH
}

export const locationToString = (location: Location, part: Part): string=>{    
    const {planet, country, zip_code, city, street, street_number, building, room} = location

    var returnStr = ""

    switch (part) {
        case Part.BOTH:
            returnStr = `${country}, ${city} (${zip_code}), ${street} ${street_number}, ${(building == null) ? "" : building + ', '}Room ${room} (${planet})`
            break;
        case Part.FIRST:
            returnStr = `${country}, ${city} (${zip_code}),`
            break;
        case Part.SECOND:
            returnStr = `${street} ${street_number}, ${(building == null) ? "" : building + ', '}Room ${room} (${planet})`
            break;
        default:
            break;
    }

    return returnStr
}