import AppHeader from "../appHeader/AppHeader";
import React, {createContext, useState} from "react";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import {Suspense, lazy} from 'react';
import Spinner from "../spinner/Spinner";
import {ErrorBoundery} from "../errorBoundery/ErrorBoundery";
import {dataContext} from "../../context/context.js"
const NotFoundPage = lazy(() =>
    import("../pages/404/NotFoundPage.jsx")
);
const MainPage = lazy(() =>
    import("../pages/mainPage/MainPage.jsx")
);
const ComicsPage = lazy(() =>
    import("../pages/comicsPage/ComicsPage.jsx")
);
const SingleComic = lazy(() =>
    import("../pages/singleComic/SingleComic.jsx")
);

const App = () => {
    console.log(1)
    const [selectedCharId, setSelectedCharId] = useState(null);
    let onCharSelected = (id:number) => {
        // @ts-ignore
        setSelectedCharId(id);
    }

    return (
        <BrowserRouter>
            {/*использование контекста*/}
            <div className="app">
              <dataContext.Provider value={{name : 'ds'}}>
                <AppHeader/>
              </dataContext.Provider>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <ErrorBoundery>
                            <Routes>
                                <Route path="/"
                                       element={<MainPage selectedCharId={selectedCharId} onCharSelected={id => {
                                           onCharSelected(id)
                                       }}/>}
                                />
                                <Route path="/comics" element={<ComicsPage/>}/>
                                <Route path="/comics/:id" element={<SingleComic/>}/>
                                <Route path="*" element={<NotFoundPage/>}/>
                            </Routes>
                        </ErrorBoundery>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}


export default App;