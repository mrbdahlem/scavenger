import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import tagService from "@/lib/service/tag.service.js";
import {useAuth} from "@/hooks/useAuth";
import { Tag } from "lucide-react";

export const TagPage = () => {
    const { hash } = useParams();
    const { user } = useAuth();
    const [tag, setTag] = useState(null);

    useEffect(() => {
        setTag(tagService.loadTag(hash));
    }, [hash])

    if (user) {
        return (
            <div>
                {/* If logged in - if unclaimed assign to game and task
                                - if claimed unassign confirm then assign only if user owns associated game
                    If not logged in - if claimed and game is unlocked, and cookie for playing, add checkpoint
                                    - if unclaimed, game is locked, or not playing, give error msg
                */}
                <h1>Tag { hash }</h1>

                {tag && !tag.game && <p>Unclaimed Tag</p>}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Tags { hash }</h1>
                <p>Coming soon...</p>
            </div>
        )
    }
}

export default TagPage;