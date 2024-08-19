import {TableRow, TableCell} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useState} from "react";

const rowHeaders = {
    "Username": {val: (u=>u.username), type: "string"},
    "First Name": {val: (u=>u.firstName), type: "string"},
    "Last Name": {val: (u=>u.lastName), type: "string"},
    "Email": {val: (u=>u.email), type: "string"},
    "Roles": {val: (u=>u.roles), type: "string"},
    "Account Enabled": {val: (u=>u.enabled), type: "boolean"},
    "Account Locked": {val: (u=>u.accountLocked), type: "boolean"},
    "Force Password Reset": {val: (u=>u.forcePasswordChange), type: "boolean"}
}

export const UserRow = ({user}) => {
    const [enabled, setEnabled] = useState(user.enabled);
    const [accountLocked, setLocked] = useState(user.accountLocked);
    const [reset, setReset] = useState(user.forcePasswordChange);

    function toggleEnabled() {
        setEnabled(prev=>!prev);
    }
    function toggleLocked() {
        setLocked(prev=>!prev);
    }
    function toggleReset() {
        setReset(prev=>!prev);
    }

    return (
        <TableRow>
            {Object.keys(rowHeaders).map((header, index) => {
                return (
                    rowHeaders[header].type !== "boolean" &&

                    <TableCell key={index}>
                        { rowHeaders[header].val (user)}
                    </TableCell>
                )
            })

            }
            <TableCell>
                <Checkbox checked={enabled} onCheckedChange={toggleEnabled} />
            </TableCell>
            <TableCell>
                <Checkbox checked={accountLocked} onCheckedChange={toggleLocked} />
            </TableCell>
            <TableCell>
                <Checkbox checked={reset} onCheckedChange={toggleReset} />
            </TableCell>
        </TableRow>
    )
}

UserRow.rowHeaders = rowHeaders;

export default UserRow;