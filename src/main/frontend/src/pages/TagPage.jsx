import {useParams} from "react-router-dom";

export const TagPage = () => {
    const { id }= useParams();
    return (
        <div>
            <h1>Tags {id}</h1>
            <p>Coming soon...</p>
        </div>
    )
}