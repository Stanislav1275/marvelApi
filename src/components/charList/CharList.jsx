import './charList.scss';
import {CharListItem} from "../charListItem/CharListItem.jsx";
import {Component, createRef} from "react";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelServices.js";
import {setRef} from "@mui/material";

class CharList extends Component {
    constructor(props) {
        super(props);
        this.mlService = this.props.mlService;

    }


    state = {
        loading: true,
        error: false,
        listItems: [],
        newItemsLoading: false,
        offset: 210,
        charsEnded: false,
    }
    renderItems = (listItems) => {

        const {setSelectedCharId} = this.props;
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
                tabIndex = {index}
                selected ={this.props.selectedCharId === id}
            >
            </CharListItem>
        })

        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }

    componentDidMount() {
        this.onRequest();
    }
    setRefItem = elem => {
        this.setState({selectedRef:elem})
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.mlService.getLimitCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    onError = () => {
        this.setState({error: true})
    }
    onCharListLoaded = (chars) => {
        let ended = false;
        if (chars.length < 9) {
            ended = true;
        }

        this.setState(({listItems, offset}) => ({
            loading: false,
            listItems: [...listItems, ...chars],
            newItemsLoading: false,
            offset: offset + 9,
            charsEnded: ended,
        }));
    }
    onCharListLoading = () => {
        this.setState({newItemsLoading: true})
    }

    render() {
        const {loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const elements = (!loading && !error) ? this.renderItems(this.state.listItems) : null;
        const errorMessage = error ? <ErrorMessage/> : null;

        return (

            <div className="char__list">
                {errorMessage}
                {elements}
                {spinner}

                <button className="button button__main button__long"
                        disabled={this.state.newItemsLoading}
                        style={{'display': this.state.charsEnded ? 'none' : 'block'}}
                        onClick={() => {
                            this.onRequest(this.state.offset)
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

}

CharList.propTypes = {
    mlService: PropTypes.instanceOf(MarvelService),
    setSelectedCharId: PropTypes.func
}
export default CharList;