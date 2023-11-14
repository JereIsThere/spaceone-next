import { PrismaClient } from "@prisma/client";

// var prisma: PrismaClient | null = null;
    
// export function getPrismaClient(): PrismaClient{
//     if(prisma == null || prisma == undefined){
//         prisma = new PrismaClient()
//     }

//     return prisma;
// }

export const prisma = new PrismaClient()