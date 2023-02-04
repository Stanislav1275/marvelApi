import "./myskeleton.scss"
import {Skeleton} from "@mui/material";
export function MySkeleton() {
    return (
        <div className="container">
            <div className="left">
                {/*<Skeleton width="100%" height={150} variant="circular"  ></Skeleton>*/}

            </div>
            <div className="right">
                {/*<Skeleton width="100%" height={100} variant="rectangular"  ></Skeleton>*/}

            </div>
        </div>
    );
}