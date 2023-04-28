import Skeleton from "../components/skeleton/Skeleton.jsx";
import Spinner from "../components/spinner/Spinner.tsx";
import ErrorMessage from "../components/errorMessage/ErrorMesage.tsx";

export const setState = (process, Component, data, newItemsLoading) => {
    switch (process) {
        case 'waiting':{
            return <Spinner/>
        }
        case 'loading':{
            return  newItemsLoading? <Component data = {data}/>: <Spinner/>
        }
        case 'access':{
            return <Component data = {data}/>
        }
        case 'error':{
            return <ErrorMessage/>
        }
    }
}
