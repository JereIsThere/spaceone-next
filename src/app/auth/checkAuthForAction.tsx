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
    MAIL
}

const divisionStrings = new Map([
    ["Geschäftsführung", DIVISIONS.GESCHAEFTSLEITUNG],
    ["Marsologie", DIVISIONS.MARSOLOGIE],
    ["Recruitment", DIVISIONS.RECRUITMENT],
    ["Merchandise", DIVISIONS.MERCHANDISE],
    ["Investor Relations", DIVISIONS.INVESTOR_RELATIONS],
    ["IT", DIVISIONS.IT],
    ["Facility", DIVISIONS.FACILITY],
    ["Undefined", DIVISIONS.UNDEFINED]
])

export function checkAuthForView(user: User | AdapterUser, site: SITE): boolean {
    const divStr = user.email ?? "Undefined"
    const usableDivision = divisionStrings.get(divStr)

    if (user.name == "Mark Born")
        return true

    switch (site) {
        case SITE.DB:
            return usableDivision == DIVISIONS.IT
        case SITE.SHOP || SITE.EVENTS || SITE.MAIL:
            return usableDivision != DIVISIONS.UNDEFINED
        case SITE.FTP:
            return usableDivision == DIVISIONS.MARSOLOGIE || usableDivision == DIVISIONS.GESCHAEFTSLEITUNG
        default:
            return false
    }
}