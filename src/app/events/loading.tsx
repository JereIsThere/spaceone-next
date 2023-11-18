import LoadingElement from "@/components/LoadingElement";
import { SITE } from "../auth/checkAuthForAction";

export default function Loading() {
    return (
        <>
            <LoadingElement site={SITE.EVENTS} />
        </>
    )
}