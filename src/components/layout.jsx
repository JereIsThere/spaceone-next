import { Banner } from "./banner"

export default function Layout({ children }) {
    return (
        <>
            <Banner />
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    )
}