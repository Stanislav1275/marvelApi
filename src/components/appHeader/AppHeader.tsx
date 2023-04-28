import './appHeader.scss';
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        // <BrowserRouter>
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink end style={({isActive}) => (
                            {
                                color: isActive ? "#9F0013" : "inherit"
                            }
                        )
                        } to={"/"}>Characters</NavLink>
                    </li>
                    <li>
                        <NavLink style={({isActive}) => (
                            {
                                color: isActive? "#9F0013" : "inherit"
                            }
                        )
                        } to={"/comics"}>Comics</NavLink>
                    </li>
                    <li>
                        <NavLink end style={({isActive}) => (
                            {
                                color: isActive ? "#9F0013" : "inherit"
                            }
                        )
                        } to={"/lib"}>Characters Library</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        // {/*</BrowserRouter>*/}
    )
}

export default AppHeader;