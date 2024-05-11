export default function Input({ register, type, classname, id, describeby, placeholder, autocomplete }) {

    return (

        <input type={type} className={classname} id={id} aria-describedby={describeby} placeholder={placeholder} autoComplete={autocomplete} />
    )
}


