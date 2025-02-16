import { MdNotes } from "react-icons/md";
import Note from "./note";
import React from "react";



const NotesList = React.memo(({ notes, setNotes , theme }) => {

    return (
        <div className={`col-span-1:p-3 rounded-md mb-6 ${ theme === 'light' ? 'bg-white ' : 'bg-[rgb(0,0,0)] border border-white'} border h-[375px] overflow-y-auto scroll-smooth`}>
            <div className={`title flex justify-center items-center my-3`}>
                <MdNotes className={`mx-3`} size={19} />
                <h4 className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} text-center`}>یاداشت های شما</h4>
            </div>
            <div className={`notes`}>
                {
                    notes.length ? (
                        notes.map(note => (
                            <Note note={note} key={note.id} setNotes={setNotes} theme={theme} />
                        ))
                    ) : (
                        <h2 className={`notAnyNote text-center tet-2xl p-3 rounded border text-[#909EAE] mx-3`}>یاداشتی ندارید</h2>
                    )
                }

            </div>
        </div>
    )
})

export default NotesList