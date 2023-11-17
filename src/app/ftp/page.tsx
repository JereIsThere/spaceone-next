import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/nextauth"

export const FTP = async ()=>{
    const session = await getServerSession(authOptions)
    const user = session?.user

    const canAccess = (user?.email == 'Marsologie' || user?.email == 'Geschäftsführung')

    if(!canAccess){
        return (<>
            <h1>Your are not Permitted.</h1>
        </>)
    }

    return (<>
        <h1>Your are permission</h1>
    </>)
}