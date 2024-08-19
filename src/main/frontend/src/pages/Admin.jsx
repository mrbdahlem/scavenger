import {Header} from "@/components/header.jsx";
import {useState, useEffect} from "react";
import {userService} from "@/lib/service/user.service.js";
import {UserTable} from "@/components/userTable.jsx";
import {Button} from "@/components/ui/button.tsx";
import {authHeader} from "@/lib/utils.ts";

export const AdminPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Get all users

        userService.getAll()
            .then(users => {
                setUsers(users);
            });
    }, []);

    function test() {
        fetch('/api/admin/test', {
            method: 'GET',
            headers: authHeader(),
        });
    }

return (
    <>
        <Header />
        <div>        <Button onClick={test}>Test</Button>
        </div>
        <UserTable users={users} />
    </>
    );
};