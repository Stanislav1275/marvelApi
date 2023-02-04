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
        this.tryBtnRed = React.createRef();
    }


    componentDidMount() {
        this._updateCharacter()
        this.tryBtnRed.current.focus();
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
        const {children} = this.props;
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
                    {
                        //клонирование children элементов с новым классом randomchar для статического блока над "try it"
                        React.Children.map(this.props.children, child => {
                            return React.cloneElement(child, {className:"randomchar__title"})
                        })
                    }



                    <button className="button button__main"
                        onClick={() => {
                            this._updateCharacter();
                            this.setState({loading: true})
                        }}
                            ref={this.tryBtnRed}
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