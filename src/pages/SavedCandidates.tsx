import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const { savedCandidates, onRemoveCandidate } = useOutletContext<{ savedCandidates: Candidate[], onRemoveCandidate: (login: string) => void }>();

  console.log('Saved Candidates:', savedCandidates);

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Login</th>
            <th>Location</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map(candidate => (
            <tr key={candidate.login}>
              <td><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
              <td>{candidate.login}</td>
              <td>{candidate.location}</td>
              <td>
                <button onClick={() => onRemoveCandidate(candidate.login)} className="remove-profile">-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
