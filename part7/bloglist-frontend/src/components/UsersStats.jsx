import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UsersStats = ({ users }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Username</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.username}</Link>
            </td>
            <td>
              {u.blogs.length}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersStats;
