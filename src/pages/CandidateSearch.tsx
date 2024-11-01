import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [candidateState, setCandidateState] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getCandidates() {
      const candidateArray: Candidate[] = await searchGithub()
      setCandidateState(candidateArray);
      if (candidateArray.length > 0) {
        const detailedCandidate = await searchGithubUser(candidateArray[0].login)
        setCurrentCandidate(detailedCandidate);
      }
    }

    getCandidates();
  }, [])

  const handleAccept = async () => {
    moveToNextCandidate();
  }

  const handleReject = async () => {
    moveToNextCandidate();
  }

  const moveToNextCandidate = async () => {
    const nextIndex = (currentIndex + 1) % candidateState.length;
    setCurrentIndex(nextIndex);
    const detailedCandidate = await searchGithubUser(candidateState[nextIndex].login);
    setCurrentCandidate(detailedCandidate);
  }

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
          <div>
            <button onClick={handleAccept}>+</button>
            <button onClick={handleReject}>-</button>
          </div>
        </div>
      ) : (
        <p>Loading candidates...</p>
      )}
    </>

  )
};

export default CandidateSearch;
