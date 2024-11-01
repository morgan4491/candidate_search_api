import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Candidate } from './interfaces/Candidate.interface';
import Nav from './components/Nav';

function App() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const handleSaveCandidate = (candidate: Candidate) => {
    setSavedCandidates([...savedCandidates, candidate]);
  };

  const handleRemoveCandidate = (login: string) => {
    setSavedCandidates(savedCandidates.filter(candidate => candidate.login !== login));
  };

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ savedCandidates, onSaveCandidate: handleSaveCandidate, onRemoveCandidate: handleRemoveCandidate }} />
      </main>
    </>
  );
}

export default App;
