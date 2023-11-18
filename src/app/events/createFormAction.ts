'use server'

import { prisma } from "@/components/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const eventSchema = zfd.formData({
    name: zfd.text(),
    time: z.string().transform((str) => new Date(str)),
    description: zfd.text(),
    hasTeamsCall: zfd.checkbox().transform((chk) => (chk) ? 1 : 0),
    placeId: zfd.numeric()
})

const locationSchema = zfd.formData({
    planet: zfd.text(),
    country: zfd.text(),
    zip_code: zfd.text(),
    city: zfd.text(),
    street: zfd.text(),
    street_number: zfd.text(),
    building: z.string().nullable(),
    room: zfd.text()
})

export async function createEvent(formData: FormData) {
    const data = eventSchema.parse(formData)

    await prisma.events.create({
        data: data
    });
    revalidatePath("/events")
}

export async function createLocation(formData: FormData) {
    const data = locationSchema.parse(formData)

    await prisma.locations.create({
        data: data
    });
    revalidatePath("/events")
}