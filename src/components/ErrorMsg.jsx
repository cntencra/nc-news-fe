import '../css/error.css'

const ErrorMsg = ({error}) => {
    return (
        <div className="error-page-container">
            <p>Status {error.status}</p>
            <p>{error.msg}</p>
            <p>oops something went wrong?</p>
    </div>
    )

}

export default ErrorMsg