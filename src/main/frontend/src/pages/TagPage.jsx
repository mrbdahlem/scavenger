import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import tagService from "@/lib/service/tag.service.js";

export const TagPage = () => {
    const { hash } = useParams();

    useEffect(() => {
        console.log(hash);
        const tag = tagService.loadTag(hash);
        console.log(tag);
    }, [hash])

    return (
        <div>
            <h1>Tags { hash }</h1>
            <p>Coming soon...</p>
            {/* If logged in - if unclaimed assign to game and task
                             - if claimed unassign confirm then assign only if user owns associated game
                If not logged in - if claimed and game is unlocked, and cookie for playing, add checkpoint
                                 - if unclaimed, game is locked, or not playing, give error msg
              */}
        </div>
    )
}

export default TagPage;