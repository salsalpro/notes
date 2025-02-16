import Swal from "sweetalert"
import React, { useEffect, useState } from "react"
import useIndexedDB from "../hooks/useIndexedDB"

const EditeModal = React.memo(({ setIsEditing, setNotes, note, theme , setFilteredNotes }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setTitle(note.title)
        setDescription(note.description)
    }, [])

    const { editNote } = useIndexedDB()
    const EditNoteHandeler = async () => {
        if (!title.trim('')) {
            return Swal({
                title: 'عنوان خالی است',
                icon: 'warning',
                button: 'ادامه',
            })
        }

        if (!description.trim()) {
            return Swal({
                title: 'توضیحات خالی است',
                icon: 'warning',
                button: 'ادامه',
            })
        }

        const newNote = {
            title,
            description,
            createdAt: Date.now()
        }

        const isEdited = await editNote(note.id, newNote)
        if (isEdited) {
            const dbRequest = indexedDB.open('notesDB', 1);

            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                const transaction = db.transaction('notes', 'readonly');
                const store = transaction.objectStore('notes');
                const getAllRequest = store.getAll();

                getAllRequest.onsuccess = () => {
                    setNotes(getAllRequest.result);
                    setIsEditing(false)
                    if (setFilteredNotes) {
                        setFilteredNotes([])
                    }
                };
            };

            setTitle('')
            setDescription('')


            return Swal({
                title: 'یاداشت بروزرسانی شد',
                icon: 'success',
                button: 'ادامه',
            })
        }

    }


    return (
        <div className={`parent fixed w-full h-full flex justify-center top-0 right-0 left-0 bottom-0 pt-32 backdrop-blur-md `}>
            <div className={`bg-[rgb(252,252,252)] p-3 rounded-lg shadow-2xl p-3 flex flex-col w-[500px] h-fit`}>

                <h3 className={`text-center mb-3 text-lg ${theme === 'light' ? 'text-black' : 'text-white'}`}>بروزرسانی</h3>
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" className={`p-3 rounded-lg bg-[rgb(252,252,252)] shadow-md mb-3 w-full outline-none`} placeholder="عنوان" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" rows={6} className={`p-3 rounded-lg bg-[rgb(252,252,252)] shadow-md mb-3 w-full outline-none`} placeholder="توضیحات" />

                <button className={`btn py-2 px-3 rounded bg-[#fff] text-black border-[#000] block mb-3`} onClick={e => setIsEditing(false)}>لغو</button>
                <button className={`btn py-2 px-3 rounded bg-[#000] text-white `} onClick={EditNoteHandeler}>ثبت بروزرسانی</button>
            </div>
        </div>
    )
})

export default EditeModal