import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvel from "../../services/useMarvel.js";
import "./comicsList.scss"
import {setState} from "../../FSM/setContentFirtstLoading.jsx";
const ComicsList = () => {
    console.log("comics  rerendered")

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvel();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => {setProcess("access")})
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }


    // const items = <View data = {comicsList}/>
    //
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {setState(process, View, comicsList, newItemLoading)}
            {/*{errorMessage}*/}
            {/*{spinner}*/}
            {/*{items}*/}
            <button
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
const View = function renderItems({data :comicsList}) {
    console.log("comics view rerendered")
    const items = comicsList.map(({thumbnail, title,price, id}, i) => {
        return (
            <li className="comics__item" key={i}>
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </Link>
            </li>
        )
    })

    return (
        <ul className="comics__grid">
            {items}
        </ul>
    )
}

export default React.memo(ComicsList);