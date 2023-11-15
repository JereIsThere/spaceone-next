import LinkButton from "./LinkButton"
import styles from './styles.module.css'

export const NavBar = () => {
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