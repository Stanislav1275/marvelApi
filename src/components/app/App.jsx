import AppHeader from "../appHeader/AppHeader.jsx";
import React, {createContext, useState} from "react";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import {Suspense, lazy} from 'react';
import Spinner from "../spinner/Spinner.jsx";
import {ErrorBoundery} from "../errorBoundery/ErrorBoundery.jsx";
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
    const [selectedCharId, setSelectedCharId] = useState(null);
    let onCharSelected = (id) => {
        setSelectedCharId(id);
    }

    return (
        <BrowserRouter>

            <div className="app">
              <dataContext.Provider value={{name : 'ds'}}>//использование контекста
                <AppHeader/>
              </dataContext.Provider>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <ErrorBoundery>
                            <Routes>
                                <Route end path="/"
                                       element={<MainPage selectedCharId={selectedCharId} onCharSelected={id => {
                                           onCharSelected(id)
                                       }}/>}
                                />
                                <Route end path="/comics" element={<ComicsPage/>}/>
                                <Route end path="/comics/:id" element={<SingleComic/>}/>
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