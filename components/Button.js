import Link from "next/link"

const Button = (props) => {
    return (
        <li><Link href={props.linktext} className="waves-effect waves-light btn">{props.text}</Link></li>
    )
}

export default Button