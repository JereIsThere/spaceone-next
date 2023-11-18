import { SITE } from '@/app/auth/checkAuthForAction'
import React from 'react'

const siteTexts = new Map([
    [SITE.EVENTS, ", die Events laden gerade"],
    [SITE.DB, ", ich lad ja schon die DB"]
])

type LoadingElementProps = {
    site: SITE, 
    hasLoadingSkeleton?: boolean | undefined
}

const LoadingElement = (props: LoadingElementProps) => {
    const siteText = siteTexts.get(props.site)

    return (<>
        <div>warte kurz{siteText}</div>
        {
            (props.hasLoadingSkeleton)
                ? <LoadingSkeleton/>
                : <></>
        }
    </>
    )
}

const LoadingSkeleton = ()=>{
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default LoadingElement