import {useParams} from "react-router-dom";

export const TagPage = () => {
    const { id }= useParams();
    return (
        <div>
            <h1>Tags {id}</h1>
            <p>Coming soon...</p>
            <!-- If logged in - if unclaimed assign to game and task
                              - if claimed unassign confirm then assign only if user owns associated game
                 If not logged in - if claimed and game is unlocked, check if playing, add checkpoint
                                  - if unclaimed, game is locked, or not playing, give error msg
              -->
        </div>
    )
}