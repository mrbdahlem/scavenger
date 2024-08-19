import {Header} from "@/components/header.jsx";
import {authHeader} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";

export const GamesPage = () => {

    function test() {
        fetch('/api/admin/test', {
            method: 'GET',
            headers: authHeader(),
        });
    }

    return (
        <>
            <Header/>

            <div><Button onClick={test}>Test</Button>
            </div>
        </>
    )
}