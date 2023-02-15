import '../randomChar/randomChar.scss'
import {Fragment} from "react";
import {Skeleton} from "@mui/material";

export const RandomAbout = ({char}) => {
    // if (state.loading) return null;
    const {
        name,
        description,
        thumbnail,
        homepage,
        wiki,
    } = char;
    return (
        <Fragment>

            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage}
                           className="button button__main"
                        >
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki}
                           className="button button__secondary"

                        >
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
        </Fragment>
    )

}