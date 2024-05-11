'use client'
import Label from '../atoms/label'
import Input from '../atoms/Input'
export default function Field({ fors, value, register, type, classname, id, describeby, placeholder, autocomplete }) {
    return (
        <>
            <Label for={fors} value={value} />
            <Input register={register} type={type} classname={classname} id={id} describeby={describeby} placeholder={placeholder} autocomplete={autocomplete} />
        </>


    )
}