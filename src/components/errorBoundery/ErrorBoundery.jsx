import {Component} from "react";
import ErrorMesage from "../errorMessage/ErrorMesage.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";

export class ErrorBoundery extends Component {
    state = {
        error: false
    }
    static getDerivedStateFromError(error) {
        console.log('here get Derived');
        // Update state so the next render will show the fallback UI.
        return { error: true };
    }
    ComponentDidCatch(error, errorInfo) {
        console.log(error)
        console.log(errorInfo)
    }

    render() {
        return this.state.error ? <ErrorMessage/> :this.props.children;
    }
}