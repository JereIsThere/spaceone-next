import { Banner } from "./banner"
import { Inter } from "next/font/google"

const inter = Inter({subsets: ['latin']})

type LayoutProps = {
    bannerIsCollapsed: boolean | undefined
}

export default function Layout(props: LayoutProps, { children }: {children: React.ReactNode}) {
    const isCollapsed = (!!props.bannerIsCollapsed) ? props.bannerIsCollapsed : true

    return (
        <>
            <Banner isCollapsed={isCollapsed}/>
            <main className={inter.className}>{children}</main>
        </>
    )
}