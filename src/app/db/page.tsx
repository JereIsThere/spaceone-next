import { getServerSession } from "next-auth/next"
import { SITE, UnauthorizedPage, checkAuthForView } from "../auth/checkAuthForAction"
import { authOptions } from "../auth/nextauth"

const DB = async () => {
    const session = await getServerSession(authOptions)
    const canView = checkAuthForView(session?.user, SITE.DB)

    // const [queryResults, setQeryResults]= useState()
    // const [query, setQuery] = useState("")

    if (!canView)
        return <UnauthorizedPage user={session?.user} />

    return <>
        {/* <div>{queryResults}</div>
        <input onChange={(e)=>setQuery(e)}></input> */}
        <h1>This is the DB page!</h1>
    </>
}

export default DB