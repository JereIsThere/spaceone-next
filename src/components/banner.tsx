type BannerProps = {
    isCollapsed: boolean
}

export const Banner = (props: BannerProps) => {
    return (
    <img src={getLogo(props.isCollapsed)} style={{width: '100%'}}/>
    )
}

function getLogo(isCollapsed: boolean): string {
    if (isCollapsed)
        return "/spaceone_logo_small.png"
    else
        return "/spaceone_logo_large.png"
}