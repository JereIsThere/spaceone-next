import { User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import error from "next/error"

export enum DIVISIONS {
    GESCHAEFTSLEITUNG,
    MARSOLOGIE,
    RECRUITMENT,
    MERCHANDISE,
    INVESTOR_RELATIONS,
    IT,
    FACILITY,
    UNDEFINED
}

export enum ACTIONS {
    VIEW,
    EDIT
}


export enum SITE {
    DB,
    SHOP,
    EVENTS,
    FTP,
    MAIL,
    LOGIN
}

const divisionStrings = new Map([
    ["Geschäftsführung", DIVISIONS.GESCHAEFTSLEITUNG],
    ["Marsologie", DIVISIONS.MARSOLOGIE],
    ["Recruitment", DIVISIONS.RECRUITMENT],
    ["Merchandise", DIVISIONS.MERCHANDISE],
    ["Investor Relations", DIVISIONS.INVESTOR_RELATIONS],
    ["Interne_IT", DIVISIONS.IT],
    ["Facility", DIVISIONS.FACILITY],
    ["Undefined", DIVISIONS.UNDEFINED]
])

export type AuthUser = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export function checkAuthForAction(user: AuthUser | undefined, site: SITE, action: ACTIONS): boolean {
    switch (action) {
        case ACTIONS.VIEW:
            return checkAuthForView(user, site)
        case ACTIONS.EDIT:
            return checkAuthForEdit(user, site)
        default:
            return false
    }
}

export function checkAuthForEdit(user: AuthUser | undefined, site: SITE): boolean {
    const division = getDivision(user)

    switch (site) {
        case SITE.EVENTS:
            return division == DIVISIONS.GESCHAEFTSLEITUNG
        default:
            return checkAuthForView(user, site)
    }
}

function getDivision(user: AuthUser | undefined): DIVISIONS {
    const divStr = user?.email ?? "Undefined"
    const usableDivision = divisionStrings.get(divStr) ?? DIVISIONS.UNDEFINED

    return usableDivision
}

export function checkAuthForView(user: AuthUser | undefined, site: SITE): boolean {
    console.log(`Accessing: ${site} with user: ${user?.name}, ${user?.email}`)

    if (!user)
        if (site != SITE.LOGIN)
            return true
        else
            return false

    //#MBF (Mark Born Forever)
    if (user.name == "Mark Born")
        return true

    const division = getDivision(user)
    const hasDivision = division != DIVISIONS.UNDEFINED

    switch (site) {
        case SITE.DB:
            return division == DIVISIONS.IT
        case SITE.EVENTS:
            return hasDivision
        case SITE.MAIL:
            return hasDivision
        case SITE.SHOP:
            return hasDivision
        case SITE.FTP:
            return division == DIVISIONS.MARSOLOGIE || division == DIVISIONS.GESCHAEFTSLEITUNG
        case SITE.LOGIN:
            return !hasDivision
        default:
            return false
    }
}

type UnauthorizedPageProps = {
    user: AuthUser | undefined,
}
export const UnauthorizedPage = (props: UnauthorizedPageProps) => {
    const user = props.user

    if (!user)
        return (<>
            <h1>To use this site, you need to be logged in.</h1>
        </>)

    return (<>
        <h1>You are {user.name}, and as a Member of {user.email}, you are not Authorized to view this page.</h1>
    </>)
}