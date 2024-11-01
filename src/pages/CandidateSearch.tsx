import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub } from "../api/API";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const { onSaveCandidate } = useOutletContext<{ onSaveCandidate: (candidate: Candidate) => void }>();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const data = await searchGithub();
    setCandidates(data);
    setCurrentCandidateIndex(0);
  };

  const handleAccept = () => {
    if (candidates[currentCandidateIndex]) {
      onSaveCandidate(candidates[currentCandidateIndex]);
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    }
  };

  const handleReject = () => {
    setCurrentCandidateIndex(currentCandidateIndex + 1);
  };

  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <div>
            <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
            <p>{currentCandidate.login}</p>
            <p>Location: {currentCandidate.location}</p>
            <p>Email: <a href={currentCandidate.email}>{currentCandidate.email}</a></p>
            <p>Company: {currentCandidate.company}</p>
          </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="save-profile" onClick={handleAccept}>+</button>
              <button className="remove-profile" onClick={handleReject}>-</button>
            </div>
        </div>
      ) : (
        <p>Loading candidates...</p>
      )}
    </>

  )
};

export default CandidateSearch;
