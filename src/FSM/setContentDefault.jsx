import Skeleton from "../components/skeleton/Skeleton.jsx";
import Spinner from "../components/spinner/Spinner.tsx";
import ErrorMessage from "../components/errorMessage/ErrorMesage.tsx";

export const setState = (process, Component, data) => {
    switch (process) {
        case 'waiting':{
            return <Skeleton/>
        }
        case 'loading':{
            return <Spinner/>
        }
        case 'access':{
            return <Component data = {data}/>
        }
        case 'error':{
            return <ErrorMessage/>
        }
    }
}
