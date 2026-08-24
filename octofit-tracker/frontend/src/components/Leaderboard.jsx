import { useEffect, useState } from 'react';
import { fetchJson } from '../config/api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const leaderboardApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJson(leaderboardApiUrl)
      .then(setEntries)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-danger">Error loading leaderboard: {error}</p>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
