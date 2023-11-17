import { getServerSession } from "next-auth";
import LinkButton from "./LinkButton"
import styles from './styles.module.css'
import { authOptions } from "@/app/auth/nextauth";
import { SITE, checkAuthForView } from "@/app/auth/checkAuthForAction";

export const NavBar = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!session?.user)
        return (
            <>
            <div className={styles.navContainer}>
                <LinkButton link="/login" text="Login" />
            </div>
            <hr className={styles.divider}/>
        </>
            )

    const canView = (site: SITE) => checkAuthForView(user)

    return (
        <>
            <div className={styles.navContainer}>
                <LinkButton link="/db" text="DB" />
                <LinkButton link="/shop" text="Webshop" />
                <LinkButton link="/events" text="Events" />
                <LinkButton link="/ftp" text="FTP" />
                <LinkButton link="/mail" text="Mail" />
            </div>
            <hr className={styles.divider}/>
        </>
    );
}