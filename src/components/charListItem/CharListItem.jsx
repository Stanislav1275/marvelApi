import "./charListItem.scss"
import {createRef, useRef} from "react";

export function CharListItem({src, name, setSelectedCharId, id, style, selected}) {
    let activeStyle = (selected) ? "char__item selected" : "char__item"
    return (
        <li className={activeStyle}
            onClick={() => {
                setSelectedCharId(id)
            }}
            tabIndex={0}
            onFocus={() => {
                setSelectedCharId(id)
            }

            }


        >
            <img style={style} src={src} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    );
}