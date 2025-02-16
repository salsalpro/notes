import Swal from "sweetalert";
import { FaPen, FaTrash } from "react-icons/fa";
import useIndexedDB from "../hooks/useIndexedDB";
import React, { useState } from "react";
import EditeModal from "./EditeModal";

const Note =  React.memo(({ note, setNotes, theme , setFilteredNotes }) => {

    const [isEditing, setIsEditing] = useState(false)

    const { deleteNote } = useIndexedDB()
    const deleteNoteHandeler = () => {
        Swal({ title: 'آیا از حذف یاداشت اطمینان دارید ؟ ', icon: 'warning', buttons: ['خیر', 'بله'] })
            .then(async result => {
                if (result) {
                    const didDelete = await deleteNote(note.id)
                    if (didDelete) {
                        const dbRequest = indexedDB.open('notesDB', 1);

                        dbRequest.onsuccess = () => {
                            const db = dbRequest.result;
                            const transaction = db.transaction('notes', 'readonly');
                            const store = transaction.objectStore('notes');
                            const getAllRequest = store.getAll();

                            getAllRequest.onsuccess = () => {
                                setNotes(getAllRequest.result);
                                if(setFilteredNotes){
                                    setFilteredNotes([])
                                }
                            };
                        };

                        return Swal({ title: 'یاداشت با موفقیت حذف شد', icon: 'success', button: 'ادامه' })
                    }
                    return Swal({ title: 'یاداشت حذف نشد', icon: 'warning', button: 'ادامه' })
                }
            })
    }

    return (
        <>
            <div className={`note p-3 rounded-lg lg:px-20 px-3 mx-3 ${theme === 'light' ? 'bg-[rgb(252,252,252)]' : 'bg-[rgb(0,0,0)] border'} shadow-md mb-3`}>
                <div className={`topbar flex justify-between mb-3`}>
                    <div className={`icons flex justify-center items-center`}>
                        <FaPen className={`mx-3 text-sky-400 cursor-pointer`} onClick={e => setIsEditing(true)} />
                        <FaTrash className={`mx-3 text-red-500 cursor-pointer`} onClick={deleteNoteHandeler} />
                    </div>
                    <div className={`date`}>
                        <span className={`text-[#909EAE]`}>{new Date(note.createdAt)?.toLocaleString('fa-IR')}</span>
                    </div>
                </div>
                <h4 className={`title ${theme === 'light' ? 'text-[#555]' : 'text-[#dcdcdc] '} text-lg whitespace-nowrap text-ellipsis overflow-hidden mb-3`}>{note.title}</h4>
                <p className={`descriptions text-sm text-[#909EAE] min-h-[21px] max-h-[150px] overflow-y-auto scroll-smooth`}>{note.description}</p>
            </div>
            {
                isEditing ? (
                    <EditeModal setIsEditing={setIsEditing} note={note} setNotes={setNotes} theme={theme} setFilteredNotes={setFilteredNotes} />
                ) : (
                    <></>
                )
            }
        </>
    )
})


export default Note