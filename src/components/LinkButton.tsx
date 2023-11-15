import Link from "next/link";
import styles from './styles.module.css'

type LinkButtonProps={
    text: string,
    link: string
}

const LinkButton = (props: LinkButtonProps)=>{
    return (
        <Link href={props.link}>
            <button className={styles.linkButton}>
                {props.text}
            </button>
        </Link>
    );
}

export default LinkButton