import Link from "next/link";

type LinkButtonProps={
    text: string,
    link: string
}

const LinkButton = (props: LinkButtonProps)=>{
    return (
        <Link href={props.link}>
            <button>
                {props.text}
            </button>
        </Link>
    );
}

export default LinkButton