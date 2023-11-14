import LinkButton from "./LinkButton"

export const NavBar = () => {
    return (
        <>
            <div className="flex-row justify-center w-full">
                <LinkButton link="/db" text="DB" />
                <LinkButton link="/shop" text="Webshop" />
                <LinkButton link="/events" text="Events" />
                <LinkButton link="/ftp" text="FTP" />
                <LinkButton link="/mail" text="Mail" />
            </div>
        </>
    );
}