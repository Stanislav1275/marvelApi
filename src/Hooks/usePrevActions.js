import PropTypes from "prop-types";
import MarvelService from "../services/MarvelServices.js";
import CharList from "../components/charList/CharList.jsx";

export const usePrevActions = (actions, callback) => {
    for(let act of actions){
        act();
    }
    callback();
}
usePrevActions.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    callback:PropTypes.func
}
