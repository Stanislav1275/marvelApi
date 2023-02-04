import AppHeader from "../appHeader/AppHeader.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";

import decoration from '../../resources/img/vision.png';
import React, {Component} from "react";
import MarvelService from "../../services/MarvelServices.js";
import {ErrorBoundery} from "../errorBoundery/ErrorBoundery.jsx";

class App extends Component {

    mlService = new MarvelService()

    state = {
        selectedCharId:null,
    }
    itemsUpdate = () => {
        this.mlService.getLimitCharacters(9).then(data => {

            this.setState({listItem:data})

        })
    }
    setSelectedCharId = (id) => {
        this.setState({selectedCharId:id});
    }
    componentDidMount() {
        this.itemsUpdate();
    }


    render() {

        const {selectedCharId} = this.state
        return (
            <div className="app">
                    <AppHeader/>
                    <main>
                            <RandomChar mlService = {this.mlService}>
                                <p>
                                    Random character for today!<br/>
                                    Do you want to get to know him better?
                                </p>
                                <p>
                                    Or choose another one
                                </p>
                            </RandomChar>
                        <div className="char__content">
                            <ErrorBoundery>
                                <CharList selectedCharId = {selectedCharId} mlService = {this.mlService} setSelectedCharId = {this.setSelectedCharId}/>
                            </ErrorBoundery>
                            <ErrorBoundery>
                                <CharInfo mlService = {this.mlService} selectedCharId = {selectedCharId}/>
                            </ErrorBoundery>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </main>
            </div>
        )
    }
}


export default App;