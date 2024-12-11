import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import tagService from "@/lib/service/tag.service.js";
import {useAuth} from "@/hooks/useAuth";
import {usePlayer} from "@/hooks/usePlayer";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BigLogo from "@/components/BigLogo.jsx";
import TagConfig from "@/components/tagConfig.jsx";
import {PlayTag} from "@/components/playTag.jsx";

export const TagPage = () => {
    const { hash } = useParams();
    const { user } = useAuth();
    const { player } = usePlayer();
    const [tag, setTag] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        tagService.loadTag(hash)
            .then((tagData) => {
                setTag(tagData);
                setLoaded(true)
            });
    }, [hash])

    function handleTagAssignment(tag) {
        const saveTag = {...tag, hash: hash};
        console.log("saving", saveTag)
        tagService.saveTag(saveTag).then(setTag);
    }

    return (
        <Card className="shadow-xl max-w-fit p-6 m-auto mt-6 h-auto">
            {/* <CardHeader> */}
                {/* <CardTitle className="border-2 border-slate-800 p-3 text-center">#{hash}</CardTitle> */}
            {/* </CardHeader> */}
            <CardContent className="flex flex-col items-center justify-center gap-10">
                <BigLogo className="lg:max-h-[200px]"/>

                <div>
                    { ( user && (tag && <TagConfig tag={tag} user={user} onChange={handleTagAssignment}/> )
                        )
                        || ( // !user || !tag
                            ( tag && (tag.gameId && <PlayTag tag={tag} player={player}/> )
                            || ( loaded && // !tag.gameId
                                <>
                                    <p className="max-w-lg">
                                        You found an unlinked scavenger hunt tag. This tag isn&apos;t connected to any game
                                        yet so you can&apos;t use it. If you are a game editor and want to link it to a game,
                                        you&apos;ll need to <Link to={"/login?redirect="+window.location.pathname}
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