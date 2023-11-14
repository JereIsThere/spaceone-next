import { Banner } from "./banner"

export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <>
            <Banner isCollapsed={true}/>
            <main>{children}</main>
        </>
    )
}