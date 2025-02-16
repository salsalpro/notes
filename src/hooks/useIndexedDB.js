import { useState, useEffect } from 'react';

const useIndexedDB = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const dbRequest = indexedDB.open('notesDB', 1);

        dbRequest.onupgradeneeded = () => {
            const db = dbRequest.result;
            if (!db.objectStoreNames.contains('notes')) {
                db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
            }
        };

        dbRequest.onsuccess = () => {
            const db = dbRequest.result;
            const transaction = db.transaction('notes', 'readonly');
            const store = transaction.objectStore('notes');
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                setNotes(getAllRequest.result);
            };
        };
    };

    const addNote = async (note) => {
        const dbRequest = indexedDB.open('notesDB', 1);
        dbRequest.onsuccess = () => {
            const db = dbRequest.result;
            const transaction = db.transaction('notes', 'readwrite');
            const store = transaction.objectStore('notes');
            store.add(note);
        };
        return true
    };

    const deleteNote = async (id) => {
        const dbRequest = indexedDB.open('notesDB', 1);
        dbRequest.onsuccess = () => {
            const db = dbRequest.result;
            const transaction = db.transaction('notes', 'readwrite');
            const store = transaction.objectStore('notes');
            store.delete(id);
        };
        return true
    };

    const editNote = async (id, updatedNote) => {
        const dbRequest = indexedDB.open('notesDB', 1);
        dbRequest.onsuccess = () => {
            const db = dbRequest.result;
            const transaction = db.transaction('notes', 'readwrite');
            const store = transaction.objectStore('notes');

            const getRequest = store.get(id);
            return getRequest.onsuccess = () => {
                const existingNote = getRequest.result;
                if (existingNote) {

                    existingNote.title = updatedNote.title || existingNote.title;
                    existingNote.description = updatedNote.description || existingNote.description;

                    const updateRequest = store.put(existingNote);
                    updateRequest.onsuccess = () => {
                        return true
                    };
                    updateRequest.onerror = (error) => {
                        return false
                    };
                }
            };
        };
        return true;
    };


    return {
        notes,
        addNote,
        deleteNote,
        editNote
    };
};


export default useIndexedDB