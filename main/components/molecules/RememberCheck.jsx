import Input from "../atoms/Input"
export default function RememberCheck() {
    return (
        <div className="form-check">
            <Input
                type={"checkbox"}
                classname={"form-check-input"}
                id={"formCheck"}
                describeby={""}
                placeholder={""}
                autocomplete={""} />
            <label className="form-check-label" htmlFor="formCheck">Remember me</label>
        </div>
    )
}