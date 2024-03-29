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

    const {loading, error, getCharacter, clearError} = useMarvel()

    useEffect(() => {
        _updateCharacter();
        tryBtnRed.current.focus();
    }, [])


    let _updateCharacter = (ticks = 1) => {
        // clearError()
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
        // const id = Math.floor(Math.random() * (16));
        getCharacter(id).then(char => {
            setChar(char);
        }).catch((e) => {
            if ((++ticks <= 30)){
                _updateCharacter(++ticks);
            }
            else throw e
        })
    }

    const content = (!loading && !error && char) ?
        // <ErrorBoundery>
            <RandomAbout char={char}/>:null;
        {/*</ErrorBoundery> : null;*/}
    const skeleton = (loading) ? <Spinner/> : null;
    // const errorMessage = (error) ? <ErrorMessage/> : null;
    return (

        <div className="randomchar">
            <div className="randomchar__block">
                {content}
                {skeleton}
                {/*{errorMessage}*/}
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

export default RandomChar;