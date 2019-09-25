import axios from 'axios';

const URL = 'http://localhost:3000/notes';

export const getNotes = async () => {
  try {
    const getNote = await axios.get(URL);
    return getNote.data;
  } catch (error) {
    throw new Error('Error');
  }
};

export const saveNotes = async (note) => {
  try {
    const saveNote = await axios.post(`${URL}`, note);
    return saveNote.data;
  } catch (error) {
    throw new Error('Error');
  }
};

export const deleteNotes = async (id) => {
  try {
    const deletedNote = await axios.delete(`${URL}/${id}`);
    return deletedNote.data;
  } catch (error) {
    throw new Error('Error');
  }
};

export const updateNotes = async (id, updatedNote) => {
  try {
    const updateNote = await axios.patch(`${URL}/${id}`, updatedNote);
    return updateNote.data;
  } catch (error) {
    throw new Error('Error');
  }
};
