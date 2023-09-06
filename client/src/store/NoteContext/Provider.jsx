import { useState, useEffect } from 'react';
import { NoteContext } from './Context';
import { getAuth } from 'firebase/auth';
import { useUserContext } from '../../hook';
import { useNavigate } from 'react-router-dom';

function NoteProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem('notes')) || [];
  });

  return (
    <NoteContext.Provider value={[notes, setNotes]}>
      {children}
    </NoteContext.Provider>
  );
}

export default NoteProvider;
