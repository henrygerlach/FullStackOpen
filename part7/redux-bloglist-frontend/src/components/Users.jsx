import { Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h2 className="h4 mb-3">Users</h2>
        <Table
          responsive
          borderless
          hover
          className="align-middle users-table mb-0"
        >
          <thead>
            <tr>
              <th>User</th>
              <th className="text-end">Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link className="blog-link" to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td className="text-end">{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Users;
