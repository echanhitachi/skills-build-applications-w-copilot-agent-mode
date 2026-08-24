import { useEffect, useState } from 'react';
import { fetchCollection } from '../config/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-danger">Error loading teams: {error}</p>;
  }

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.members?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
