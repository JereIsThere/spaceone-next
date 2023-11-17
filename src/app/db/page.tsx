import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/nextauth"
import { SITE, UnauthorizedPage, checkAuthForView } from "../auth/checkAuthForAction"

const DB = async () => {
    const session = await getServerSession(authOptions)
    const canView = checkAuthForView(session?.user, SITE.DB)

    if (!canView)
        return <UnauthorizedPage user={session?.user} />

    return <h1>This is the DB-Site.</h1>
}

export default DB