import ErrorMessage from "../../errorMessage/ErrorMesage.jsx";
import("./notFoundPage.scss")
const NotFoundPage = () => {
    return (
        <div className="notfoundPage">
            <ErrorMessage/>
            <div>
               <h1>404 - Not found</h1>
            </div>
        </div>
    )
}
export default NotFoundPage