import AppHeader from "../appHeader/AppHeader.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";

import decoration from '../../resources/img/vision.png';
import React, {useEffect, useState} from "react";
import useMarvel from "../../services/useMarvel.js";
// import MarvelService from "../../services/MarvelServices.js";
import {ErrorBoundery} from "../errorBoundery/ErrorBoundery.jsx";

const App = () => {

    let mlService = useMarvel();
    // const {getLimitCharacters} = mlService;
    const [selectedCharId, setSelectedCharId] = useState(null);
    // const [listItem, setListItem] = useState([]);

    // let itemsUpdate = () => {
    //     getLimitCharacters(9).then(data => {
    //
    //         setListItem(data)
    //
    //     })
    // }
    let onCharSelected = (id) => {
        setSelectedCharId(id);
    }
    // useEffect(() => {
    //     itemsUpdate()
    // }, []);
    return (
        <div className="app">
            <AppHeader/>
            <main>
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
                    {/*<ErrorBoundery>*/}
                    {/*    <CharList selectedCharId={selectedCharId}*/}
                    {/*              setSelectedCharId={onCharSelected}/>*/}
                    {/*</ErrorBoundery>*/}
                    {/*<ErrorBoundery>*/}
                    {/*    <CharInfo mlService={mlService} selectedCharId={selectedCharId}/>*/}
                    {/*</ErrorBoundery>*/}
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}


export default App;