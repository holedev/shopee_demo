import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { NoteContext } from '../store/NoteContext';

function useUserContext() {
  const [user, setUser] = useContext(UserContext);
  return [user, setUser];
}

function useNoteContext() {
  const [notes, setNotes] = useContext(NoteContext);
  return [notes, setNotes];
}

export { useUserContext, useNoteContext };
