import {Component} from "react";
import ErrorMesage from "../errorMessage/ErrorMesage";
import ErrorMessage from "../errorMessage/ErrorMesage";
interface IRecipeProps{
    children : any
}
interface IRecipeState{
    error: boolean
}
export class ErrorBoundery extends Component<IRecipeProps,IRecipeState> {

    state = {
        error: false
    }
    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { error: true };
    }
    ComponentDidCatch(error : boolean, errorInfo : string) {
        console.log(errorInfo)
    }

    render() {
        return this.state.error ? <ErrorMessage/> :this.props.children;
    }
}