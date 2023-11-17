import { getServerSession } from "next-auth";
import LinkButton from "./LinkButton"
import styles from './styles.module.css'
import { authOptions } from "@/app/auth/nextauth";
import { SITE, UnauthorizedPage, checkAuthForView } from "@/app/auth/checkAuthForAction";

export const NavBar = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user

    const canView = (site: SITE) => checkAuthForView(user, site)

    const sites = [
        {site: SITE.DB, link: "/db", name: "DB"},
        {site: SITE.SHOP, link: "/shop", name: "Shop"},
        {site: SITE.EVENTS, link: "/events", name: "Events"},
        {site: SITE.FTP, link: "/ftp",name: "FTP"},
        {site: SITE.MAIL, link: "/mail", name:"Mail"},
        {site: SITE.LOGIN, link: "/login", name: "Login"}
    ]

    return (
        <>
            <div className={styles.navContainer}>
                {
                    sites.map((site)=>
                         (
                            canView(site.site) 
                                ? <LinkButton link={site.link} text={site.name} key={site.link}/> 
                                : <></>
                        )
                    )
                }
            </div>
            <hr className={styles.divider} />
        </>
    );
}