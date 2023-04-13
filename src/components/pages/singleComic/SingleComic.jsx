import './singleComic.scss';
import {Link, useParams} from "react-router-dom";
import useMarvel from "../../../services/useMarvel.js";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import Spinner from "../../spinner/Spinner.jsx";
import ErrorMessage from "../../errorMessage/ErrorMesage.jsx";

const SingleComic = () => {

    const {id} = useParams();
    const {loading, error, getComics} = useMarvel();
    const [info, setInfo] = useState(null);
    useEffect(() => {
        updateComic();
    }, [id])
    let updateComic = () => {
        // clearError();
        if (!id) return;
        // onCharLoading();
        getComics(id)
            .then(setInfo)
    }
    const spinner = loading && !error ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !loading && !error && info ? <View {...info}/> : null;
    return (
        <div className="single-comic">

            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}
const View = ({description, title, thumbnail, pageCount, price, language}) => {
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link  to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}
export default SingleComic;