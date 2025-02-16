import React, { useState } from "react";
import Note from "./note";
import { FaTimes } from "react-icons/fa";

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

const SearchNote = React.memo(({ notes, setNotes, theme, mobileMenuSearchNote, setMobileMenuSearchNote }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([...notes]);

    const handleSearch = debounce((query) => {
        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredNotes(filtered);
    }, 500);

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    return (
        <>
            <div className={`SearchNote lg:col-span-2 hidden lg:block col-span-1 p-3 rounded-md ${theme === 'light' ? 'bg-white' : 'bg-[rgb(0,0,0)] border border-white'} border`}>
                <input
                    type="text"
                    className={`p-3 rounded-lg ${theme === 'light' ? 'bg-[rgb(252,252,252)]' : 'bg-[rgb(0,0,0)] caret-white text-white'} shadow-md mb-3 w-full outline-none `}
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="جستوجو"
                />
                {
                    filteredNotes.length ? (
                        <div className="notes max-h-[300px] overflow-y-auto scroll-smooth">
                            {
                                filteredNotes.map(note => (
                                    <Note note={note} key={note.id} setNotes={setNotes} theme={theme} setFilteredNotes={setFilteredNotes} />
                                ))
                            }
                        </div>
                    ) : (
                        <h2 className={`notAnyNote text-center text-2xl p-3 rounded border text-[#909EAE]`}>
                            یاداشتی پیدا نشد
                        </h2>
                    )
                }
            </div>
            {
                console.log('mobileMenuSearchNote => ', mobileMenuSearchNote)
            }
            <div className={`${mobileMenuSearchNote ? 'bottom-[0px]' : 'bottom-[-450px]'} searchInBottom transition-all ease-in-out duration-500 w-full fixed right-0 left-0 p-3 block lg:hidden rounded-t-lg ${theme === 'light' ? 'bg-white' : 'bg-[rgb(0,0,0)] border border-white'} border h-fit`}>
                <div className="topbar">
                    <FaTimes color="#909EAE" size={23} className="cursor-pointer" onClick={e => setMobileMenuSearchNote(false)} />
                </div>
                <div className="body">
                    <input
                        type="text"
                        className={`p-3 rounded-lg ${theme === 'light' ? 'bg-[rgb(252,252,252)]' : 'bg-[rgb(0,0,0)] caret-white text-white'} shadow-md mb-3 w-full outline-none `}
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="جستوجو"
                    />
                    {
                        filteredNotes.length ? (
                            <div className="notes max-h-[300px] overflow-y-auto scroll-smooth">
                                {
                                    filteredNotes.map(note => (
                                        <Note note={note} key={note.id} setNotes={setNotes} theme={theme} setFilteredNotes={setFilteredNotes} />
                                    ))
                                }
                            </div>
                        ) : (
                            <h2 className={`notAnyNote text-center text-2xl p-3 rounded border text-[#909EAE]`}>
                                یاداشتی پیدا نشد
                            </h2>
                        )
                    }
                </div>
            </div>
        </>
    );
})


export default SearchNote