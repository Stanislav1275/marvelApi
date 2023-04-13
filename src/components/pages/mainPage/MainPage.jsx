import {ErrorBoundery} from "../../errorBoundery/ErrorBoundery.jsx";
import RandomChar from "../../randomChar/RandomChar.jsx";
import CharList from "../../charList/CharList.jsx";
import CharInfo from "../../charInfo/CharInfo.jsx";
import decoration from "../../../resources/img/vision.png";
import React from "react";
import {useParams} from "react-router-dom";

const MainPage = ({selectedCharId, onCharSelected}) => {

    return (
        <>
            <ErrorBoundery>
                <RandomChar>
                    <p>
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p>
                        Or choose another one
                    </p>
                </RandomChar>
            </ErrorBoundery>

            <div className="char__content">
                <ErrorBoundery>
                    <CharList selectedCharId={selectedCharId}
                              setSelectedCharId={onCharSelected}/>
                </ErrorBoundery>
                <ErrorBoundery>
                    <CharInfo selectedCharId={selectedCharId}/>
                </ErrorBoundery>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>

        </>
    )
}
export default MainPage