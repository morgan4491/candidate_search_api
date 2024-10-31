import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';



const CandidateSearch = () => {

  const [ candidateState, setCandidateState ] = useState<Candidate[]>([]);

  useEffect(() => {
    async function getCandidates() {
      const candidateArray : Candidate[] = await searchGithub()
      
      setCandidateState(candidateArray);
    }
    
    getCandidates();
  }, [])

  return (
    <div>

      <h1>CandidateSearch</h1>
      {candidateState.length>0 && <p>{candidateState[0].login}</p>}
    </div>
    
  )
};

export default CandidateSearch;
