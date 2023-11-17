'use server'

import { prisma } from "@/components/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
    name: zfd.text(),
    time: z.string().transform((str) => new Date(str)),
    description: zfd.text(),
    hasTeamsCall: zfd.checkbox().transform((chk) => (chk) ? 1 : 0),
    placeId: zfd.numeric()
})

export async function create(formData: FormData) {
    const data = schema.parse(formData)

    await prisma.events.create({
        data: data
    });
    revalidatePath("/events")
}