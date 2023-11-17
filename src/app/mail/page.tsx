import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/nextauth"
import { SITE, UnauthorizedPage, checkAuthForView } from "../auth/checkAuthForAction"

const MailPage = async ()=>{
    const session = await getServerSession(authOptions)
    const canView = checkAuthForView(session?.user, SITE.MAIL)

    if(!canView)
        return <UnauthorizedPage user={session?.user}/>

    return <h1>This is the Mail page. You are logged in as {session?.user?.name}.</h1>
}

export default MailPage