import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/nextauth"
import { SITE, UnauthorizedPage, checkAuthForView } from "../auth/checkAuthForAction"

const FTP = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user

    const canAccess = checkAuthForView(user, SITE.FTP)

    if (!canAccess) {
        return <UnauthorizedPage user={user} />
    }

    return (<>
        <h1>This is the FTP-Page!</h1>
    </>)
}
export default FTP