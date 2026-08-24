import { useEffect, useState } from 'react';
import { fetchCollection } from '../config/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-danger">Error loading users: {error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
