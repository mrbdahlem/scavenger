import {Header} from "@/components/header.jsx";
import {useState, useEffect} from "react";
import {userService} from "@/lib/service/user.service.js";
import {UserTable} from "@/components/userTable.jsx";

export const AdminPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Get all users

        userService.getAll()
            .then(users => {
                setUsers(users);
            });
    }, []);

return (
    <>
        <Header />
        <div className="mt-[60px] overflow-y-auto">
            <UserTable users={users} />
        </div>
    </>
    );
};

export default AdminPage;