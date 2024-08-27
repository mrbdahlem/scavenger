import { useMemo } from "react";
import {QRCode} from "react-qr-code";
import {shortUUID} from "@/lib/utils";

export const TagsPage = () => {

    const tags = useMemo(() => {
        let t = [];
        for (let i = 0; i < 12; i++) {
            t.push(shortUUID(crypto.randomUUID()));
        }
        return t;}
        , []);


    return (
        <div className="p-5 grid sm: grid-cols-3 md:grid-cols-4 lg:grid-cols-8 grid-flow-row gap-10">
            { tags.map((tag)=>( <>{tag}<br/><QRCode key={tag} size={100} value={window.location.protocol + "//" + window.location.hostname + "/tag/" + tag} /> </>)) }
        </div>
    )
}

export default TagsPage;