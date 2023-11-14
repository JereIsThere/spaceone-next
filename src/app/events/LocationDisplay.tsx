import { prisma } from "@/components/prisma";
import { Prisma } from "@prisma/client";

type LocationDisplayProps = {
    locations: Prisma.locationsGetPayload<true>[]
}

export function locationToString(location: Prisma.locationsGetPayload<true>): string{
    const {planet, country, zip_code, city, street, street_number, building, room} = location

    return `${country}, ${city} (${zip_code}), ${street} ${street_number}, ${(building == null) ? "" : building + ', '}Room ${room} (${planet})`
}

export const LocationDisplay = (props: LocationDisplayProps) => {
    const locs = props.locations
    console.log(locs)

    return (<>
        {locs.map(location =>
            <h1>{locationToString(location)}</h1>
        )}
    </>);
}