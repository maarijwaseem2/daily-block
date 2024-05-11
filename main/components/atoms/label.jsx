export default function Label(props) {
    return (
        <label htmlFor={props.for}>{props.value}</label>
    )
}