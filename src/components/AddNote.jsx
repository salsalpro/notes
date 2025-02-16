import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import Swal from "sweetalert";

const AddNote = React.memo(({ addNote, setNotes, theme, mobileMenuAddNoteShow, setMobileMenuAddNoteShow }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addNoteHandeler = async () => {
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
        const isCreated = await addNote(newNote)
        if (isCreated) {
            const dbRequest = indexedDB.open('notesDB', 1);

            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                const transaction = db.transaction('notes', 'readonly');
                const store = transaction.objectStore('notes');
                const getAllRequest = store.getAll();

                getAllRequest.onsuccess = () => {
                    setNotes(getAllRequest.result);
                };
            };

            setTitle('')
            setDescription('')

            return Swal({
                title: 'یاداشت شد',
                icon: 'success',
                button: 'ادامه',
            })
        }

        Swal({
            title: 'مشکلی در  وجود دارد',
            icon: 'error',
            button: 'ادامه',
        })
    }

    return (
        <>
            <div className={`col-span-1 p-3 hidden lg:block rounded-md ${theme === 'light' ? 'bg-white' : 'bg-[rgb(0,0,0)] border border-white'} border h-fit`}>
                <div className={`title flex justify-center items-center mb-3`}>
                    <MdOutlineEditNote className={`mx-3`} size={19} />
                    <h4 className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} text-center`}>افزودن یاداشت</h4>
                </div>
                <form onSubmit={e => e.preventDefault()}>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className={`p-3 rounded-lg ${theme === 'light' ? 'bg-[rgb(252,252,252)] ' : 'bg-[rgb(0,0,0)] border caret-white text-white'} outline-none shadow-md mb-3 w-full`} placeholder="عنوان" />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" rows={6} className={`p-3 rounded-lg ${theme === 'light' ? 'bg-[rgb(252,252,252)] ' : 'bg-[rgb(0,0,0)] border caret-white text-white'} outline-none shadow-md mb-3 w-full shadow-md mb-3 w-full outline-none`} placeholder="توضیحات" />
                    <button onClick={addNoteHandeler} type="text" className={`p-3 rounded-lg shadow-md mb-3 w-full outline-none bg-[#909EAE] text-white`} placeholder={'عنوان'} >افزودن یاداشت</button>
                </form>
            </div>
            <div className={`${mobileMenuAddNoteShow ? 'bottom-[0px]' : 'bottom-[-450px]'} transition-all ease-in-out duration-500 w-full fixed right-0 left-0 p-3 block lg:hidden rounded-t-lg ${theme === 'light' ? 'bg-white' : 'bg-[rgb(0,0,0)] border border-white'} border h-fit`}>
                <div className="topbar">
                    <FaTimes color="#909EAE" size={23} className="cursor-pointer" onClick={e => setMobileMenuAddNoteShow(false)} />
                </div>
                <div className="body">
                    <div className={`title flex justify-center items-center mb-3`}>
                        <MdOutlineEditNote className={`mx-3`} size={19} />
                        <h4 className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} text-center`}>افزودن یاداشت</h4>
                    </div>
                    <form onSubmit={e => e.preventDefault()}>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" className={`p-3 rounded-lg ${theme === 'light' ? 'bg-[rgb(252,252,252)] ' : 'bg-[rgb(0,0,0)] border caret-white text-white'} outline-none shadow-md mb-3 w-full`} placeholder="عنوان" />
                        <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" rows={6} className={`p-3 rounded-lg ${theme === 'light' ? 'bg-[rgb(252,252,252)] ' : 'bg-[rgb(0,0,0)] border caret-white text-white'} outline-none shadow-md mb-3 w-full shadow-md mb-3 w-full outline-none`} placeholder="توضیحات" />
                        <button onClick={addNoteHandeler} type="text" className={`p-3 rounded-lg shadow-md w-full outline-none bg-[#909EAE] text-white`} placeholder={'عنوان'} >افزودن یاداشت</button>
                    </form>
                </div>
            </div>
        </>
    )
})


export default AddNote