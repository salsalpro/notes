import { useEffect, useState } from "react";
import AddNote from "./components/AddNote"
import NotesList from "./components/NotesList"
import useIndexedDB from "./hooks/useIndexedDB";
import SearchNote from "./components/SearchNote";
import { getTheme, setTheme } from "./utils/theme";
import { FiMoon, FiSun } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";


function App() {
  const { notes: notesIndexDB, addNote } = useIndexedDB();
  const [notes, setNotes] = useState([])
  const [theme, setThemeState] = useState('light');
  const [mobileMenuAddNoteShow, setMobileMenuAddNoteShow] = useState(false)
  const [mobileMenuSearchNote, setMobileMenuSearchNote] = useState(false)

  useEffect(() => {
    setNotes(notesIndexDB)
    const theme = getTheme()
    setThemeState(theme)
  }, [notesIndexDB])

  const setThemeHandeler = () => {
    const themeNeedToBeSet = theme === 'light' ? 'dark' : 'light'
    setThemeState(themeNeedToBeSet)
    setTheme(themeNeedToBeSet)
  }

  return (
    <div className={`parent-all py-12 lg:px-20 px-3 ${theme === 'light' ? 'bg-[rgb(252,252,252)]' : 'bg-[rgb(0,0,0)]'}`}>
      <div className={`title text-center block text-2xl mb-8`}>
        {
          theme === 'dark' ? (
            <FiSun className={`cursor-pointer`} onClick={setThemeHandeler} color={`${theme === 'light' ? '#000' : '#fff'}`} />
          ) : <FiMoon className={`cursor-pointer`} onClick={setThemeHandeler} color={`${theme === 'light' ? '#000' : '#fff'}`} />
        }
      </div>
      <div className={`parent-notes grid lg:grid-cols-2 grid-cols-1 gap-10 mb-3`}>
        <SearchNote notes={notes} setNotes={setNotes} theme={theme} mobileMenuSearchNote={mobileMenuSearchNote}
          setMobileMenuSearchNote={setMobileMenuSearchNote} />
        <NotesList notes={notes} setNotes={setNotes} theme={theme} />
        <AddNote addNote={addNote} setNotes={setNotes} theme={theme} mobileMenuAddNoteShow={mobileMenuAddNoteShow}
          setMobileMenuAddNoteShow={setMobileMenuAddNoteShow} />
      </div>
      <div className={`${mobileMenuAddNoteShow || mobileMenuSearchNote ? 'bottom-[-50px]' : 'bottom-0'} bottomBar transition-all ease-in-out duration-500 w-full fixed right-0 left-0 p-3 flex lg:hidden rounded-t-lg ${theme === 'light' ? 'bg-white' : 'bg-[rgb(0,0,0)] border border-white'} border h-fit justify-center items-center`}>
        <CiCirclePlus className="mx-3 cursor-pointer" size={29} color="#909EAE" onClick={e => setMobileMenuAddNoteShow(true)} />
        <FiSearch className="mx-3 cursor-pointer" size={29} color="#909EAE" onClick={e => setMobileMenuSearchNote(true)} />
      </div>
    </div>
  )
}

export default App
