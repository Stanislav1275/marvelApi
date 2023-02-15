import './charInfo.scss';
import {useEffect, useState} from "react";
import Skeleton from "../skeleton/Skeleton.jsx";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";

const  CharInfo = ({selectedCharId, mlService}) =>  {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    },[selectedCharId])
    let updateChar = () => {
        if (!selectedCharId) return;
        onCharLoading();
        mlService.getCharacter(selectedCharId)
            .then(onCharLoaded)
            .catch(onError);
    }
    let onError = () => {
        setError(true);
        setLoading(false);
    }
    let onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);

    }
    let onCharLoading = () => {
        setLoading(true);
    }

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = (!loading && !error && char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )

}

const View = ({char}) => {
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
}
export default CharInfo;