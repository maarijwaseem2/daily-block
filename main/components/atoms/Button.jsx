export default function Button({ isSubmitting, value }) {
    return (
        <div className="form-btn">
            <button disabled={isSubmitting} type='submit' className='btn-filled'>{isSubmitting ? "Loading..." : value}  </button>
        </div>

    )
}