import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import tagService from "@/lib/service/tag.service.js";
import {useAuth} from "@/hooks/useAuth";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BigLogo from "@/components/BigLogo.jsx";
import TagConfig from "@/components/tagConfig.jsx";

export const TagPage = () => {
    const { hash } = useParams();
    const { user } = useAuth();
    const [tag, setTag] = useState(null);

    useEffect(() => {
        setTag(tagService.loadTag(hash));
    }, [hash])

    return (
        <Card className="shadow-xl max-w-fit p-6 m-auto mt-6">
            <CardHeader>
                <CardTitle className="border-2 border-slate-800 p-3">#{hash}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-10">
                <BigLogo className="lg:max-h-[200px]"/>

                <div>
                    {/* If logged in - if unclaimed assign to game and task
                            - if claimed unassign confirm then assign only if user owns associated game
                        If not logged in - if claimed and game is unlocked, and cookie for playing, add checkpoint
                                - if unclaimed, game is locked, or not playing, give error msg
                    */}

                    { ( user && (tag && <TagConfig tag={tag} user={user} onChange={setTag}/> )
                        )
                        || ( // !user
                            ( tag && (tag.game &&
                                <>You found a tag. If only this was implemented.</>
                            )
                            || ( // !tag.game
                                <>
                                    <p className="max-w-lg">
                                        You found an unlinked scavenger hunt tag. This tag isn't connected to any game
                                        yet so you can't use it. If you are a game editor and want to link it to a game,
                                        you'll need to <Link to={"/login?redirect="+window.location.pathname}
                                        className="underline">log in</Link>.
                                    </p>
                                </>
                            )))
                    }
                </div>
            </CardContent>
        </Card>


    )
}

export default TagPage;