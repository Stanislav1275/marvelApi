import abyss from "../../resources/img/abyss.jpg";
import "./charListItem.scss"
export function CharListItem({src, name, setSelectedCharId, id, style}) {
    return (
        <li className="char__item"
            onClick={() => {
                setSelectedCharId(id)
            }}
        >
            <img style = {style} src={src} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    );
}