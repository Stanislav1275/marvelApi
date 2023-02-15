import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import React, {Component, useEffect, useRef, useState} from "react";
import {RandomAbout} from "../randomAbout/randomAbout.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import {ErrorBoundery} from "../errorBoundery/ErrorBoundery.jsx";
import useMarvel from "../../services/useMarvel.js";

const RandomChar = ({children}) => {

    let tryBtnRed = useRef(null);
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter} = useMarvel()

    useEffect(() => {
        _updateCharacter();
        tryBtnRed.current.focus();
    }, [])


    let _updateCharacter = () => {
        let tick = 0;
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
        getCharacter(id).then(data => {
            console.log(data)
            setChar(data);
        }).catch(e => {
            if (++tick > 10) {
                return;
            }
            // _updateCharacter()
        })


    }

    const content = (!loading && !error) ?
        <ErrorBoundery>
            <RandomAbout char={char}/>
        </ErrorBoundery>
        : null;
    const skeleton = (loading) ? <Spinner/> : null;
    const errorMessage = (error) ? <ErrorMessage/> : null;
    return (

        <div className="randomchar">
            <div className="randomchar__block">
                {content}
                {skeleton}
                {errorMessage}
            </div>
            <div className="randomchar__static">
                {
                    //клонирование children элементов с новым классом randomchar для статического блока над "try it"
                    React.Children.map(children, child => {
                        return React.cloneElement(child, {className: "randomchar__title"})
                    })
                }


                <button className="button button__main"
                        onClick={() => {
                            _updateCharacter();
                        }}
                        ref={tryBtnRed}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>


    )
}
const View = ({char}) => {


}
export default RandomChar;