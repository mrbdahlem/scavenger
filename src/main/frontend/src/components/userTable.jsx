import {Table, TableBody, TableHeader, TableRow, TableCell} from "@/components/ui/table.tsx";
import {UserRow} from "@/components/userRow.jsx";

export const UserTable = ({users}) => {

    return (
    <Table>
        <TableHeader>
            <TableRow>
                {
                    Object.keys(UserRow.rowHeaders).map((header, index) => {
                        return (
                            <TableCell key={index}>
                                {header}
                            </TableCell>
                        );
                    })
                }
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                users.map(
                    user => (
                        <UserRow key={user.username} user={user} />
                    )
                )
            }
        </TableBody>
    </Table>
    )
};