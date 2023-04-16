import './charList.scss';
import {CharListItem} from "../charListItem/CharListItem.jsx";
import React, {useEffect, useMemo, useState} from "react";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelServices.js";
import useMarvel from "../../services/useMarvel.js";

const CharList = ({setSelectedCharId, selectedCharId}) => {
    const {loading, error, getLimitCharacters} = useMarvel();
    const [listItems, setListItems] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharEnded] = useState(false);
    let renderItems = (listItems) => {

        const items = useMemo(() => listItems.map(({name, thumbnail, id}, index) => {
            let imgStyle = {'objectFit': 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return <CharListItem
                style={imgStyle}
                id={id}
                setSelectedCharId={setSelectedCharId}
                name={name}
                src={thumbnail}
                key={id}
                tabIndex={index}
                selected={selectedCharId === id}
            >
            </CharListItem>
        }), [listItems])

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }

    useEffect(() => {
        onRequest(offset, true)
    }, [])


    let onRequest = (offset, isFirst = false) => {
        setNewItemsLoading(!isFirst);//если isFirst, т.е эт не первая загрузка, то флаг новыеЭл-ы - false, эт для подгрузки
        getLimitCharacters(offset)
            .then(onCharListLoaded)

    }

    let onCharListLoaded = (chars) => {
        let ended = false;
        if (chars.length < 9) {
            ended = true;
        }
        // setLoading(false);
        setListItems(prevListItems => [...prevListItems, ...chars])
        setNewItemsLoading(false)
        setOffset(prevOffset => prevOffset + 9)
        setCharEnded(ended);
    }
    const spinner = loading && !newItemsLoading ?
        <div className="charListSpinnerWrapper">
            <Spinner/>
        </div>
        : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const elements = renderItems(listItems);

    return (

        <div className="char__list">
            {errorMessage}
            {elements}
            {spinner}

            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charsEnded ? 'none' : 'block'}}
                    onClick={() => {
                        onRequest(offset, false)
                    }}
            >
                <div
                    className="inner"

                >load more
                </div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    mlService: PropTypes.instanceOf(MarvelService),
    setSelectedCharId: PropTypes.func
}
export default CharList;