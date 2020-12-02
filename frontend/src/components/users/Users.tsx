import React from 'react';
import { Button, Table } from 'reactstrap';

const Users = (props: any) => {
    const { list, canEdit, canDelete, editHandler, deleteHandler } = props;
    return (
        <Table striped bordered hover responsive variant="dark">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    {canEdit && <th>Edit</th>}
                    {canDelete && <th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {list.map((user: any) => {
                    return (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            {canEdit && <td><Button color="primary" onClick={editHandler}>Edit</Button></td>}
                            {canDelete && <td><Button color="danger" onClick={deleteHandler}>Delete</Button></td>}
                        </tr>
                    )
                })}

            </tbody>
        </Table>

    );
}

export default Users;