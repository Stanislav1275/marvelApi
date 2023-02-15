import './charList.scss';
import {CharListItem} from "../charListItem/CharListItem.jsx";
import {useEffect, useRef, useState} from "react";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelServices.js";
import useMarvel from "../../services/useMarvel.js";

const CharList = ({mlService, setSelectedCharId, selectedCharId}) => {
    const {loading, error, getLimitCharacters, getCharacter} = useMarvel();
    const [listItems, setListItems] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharEnded] = useState(false);
    let renderItems = (listItems) => {
        const items = listItems.map(({name, thumbnail, id}, index) => {
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
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }
    useEffect(() => {
        onRequest()
    }, [])



    let onRequest = (offset) => {
        onCharListLoading();
        mlService.getLimitCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    let onCharListLoaded = (chars) => {
        let ended = false;
        if (chars.length < 9) {
            ended = true;
        }
        // setLoading(false);
        setListItems(prevListItems => {return [...prevListItems, ...chars]})
        setNewItemsLoading(false)
        setOffset(prevOffset => prevOffset + 9)
        setCharEnded(ended);
    }
    let onCharListLoading = () => {
        setNewItemsLoading(true)
    }

    const spinner = loading ? <Spinner/> : null;
    const elements = (!loading && !error) ? renderItems(listItems) : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (

        <div className="char__list">
            {errorMessage}
            {elements}
            {spinner}

            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charsEnded ? 'none' : 'block'}}
                    onClick={() => {
                        onRequest(offset)
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