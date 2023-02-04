import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import React, {Component} from "react";
import {RandomAbout} from "../randomAbout/randomAbout.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import {ErrorBoundery} from "../errorBoundery/ErrorBoundery.jsx";

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.mlService = this.props.mlService;
    }


    componentDidMount() {
        this._updateCharacter()
    }

    state = {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
        loading: true,
        error:false,

    }
    _updateCharacter = () => {
        let tick = 0;
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);

        this.mlService.getCharacter(id).then(data => {
            this.setState(data);
            this.setState({loading: false})
        }).catch(e => {
            if(++tick > 10) {
                this.setState({error:true})
                return;
            }
            this._updateCharacter()
        })


    }

    render() {
        const {loading, error} = this.state;
        const content = (!loading && !error)?  <ErrorBoundery><RandomAbout state={this.state}/></ErrorBoundery> :null;
        const skeleton = (loading)?<Spinner/>:null;
        const errorMessage = (error)?<ErrorMessage/>:null;
        return (

            <div className="randomchar">
                <div className="randomchar__block">
                    {content}
                    {skeleton}
                    {errorMessage}
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                        onClick={() => {
                            this._updateCharacter();
                            this.setState({loading: true})
                        }}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>


        )
    }
}

export default RandomChar;