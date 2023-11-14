import Image from "next/image"

type BannerProps = {
    isCollapsed: boolean
}

export const Banner = (props: BannerProps) => {
    return (
        <Image
            alt="Banner with logo"
            src={getLogo(props.isCollapsed)}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}/>
    )
}

function getLogo(isCollapsed: boolean): string {
    if (isCollapsed)
        return "/spaceone_logo_small.png"
    else
        return "/spaceone_logo_large.png"
}