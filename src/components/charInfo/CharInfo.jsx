import './charInfo.scss';
import {useEffect, useMemo, useState} from "react";
import useMarvel from "../../services/useMarvel.js";
import {setState} from "../../FSM/setContentDefault.jsx";

const CharInfo = ({selectedCharId}) => {
    const {getCharacter, process, setProcess} = useMarvel()
    const [char, setChar] = useState(null);
    useEffect(() => {
        updateChar();
    }, [selectedCharId])
    let updateChar = () => {
        // clearError();
        if (!selectedCharId) return;
        // onCharLoading();
        getCharacter(selectedCharId)
            .then(setChar)
            .then(() => {
                setProcess("access")
            })
    }

    return (
        <div className="char__info">
            {setState(process, View, char)}
        </div>
    )

}

const View = (({data : char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }
    let comicsLimit = 9;
    let viewComics = comics.slice(0, comicsLimit);
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    viewComics.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                <a href={item.resourceURI}>
                                    {item.name}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
})
export default CharInfo;