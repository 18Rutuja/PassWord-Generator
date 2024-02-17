import { useState , useCallback, useEffect, useRef} from 'react'


function App() {
  const [length , setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");

//useRef hook
const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
    if (numberAllowed) str += "01234567689";
    if (charAllowed) str += "!@#$%^&*()_+{}|?><[]~";

    for (let i = 1; i <=length; i++) {
     let char  = Math.floor(Math.random() * str.length +1)
    pass += str.charAt(char)
    }
    setPassword(pass)
  } , [length , numberAllowed, charAllowed , setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-3 my-12 text-green-400 text- bg-slate-950" >
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-7">
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-2 px-3'
        placeholder='Password' 
        readOnly
        ref = {passwordRef}
        />
        <button className='py-2 px-4 bg-green-400
        text-white outline-none'
        onClick={copyPasswordToClipboard}>Copy</button>
        
      </div>
    
      <div className='flex-wrap'>
        <div className="flex items-center gap-x-1">
          <input 
          type="range" 
          min={6}
          max={32}
          value={length}
          className='w-full  h-3'
          onChange={(e) => {setLength(e.target.value)}}
           />
          <lable>Length:{length}</lable>
        </div>
        
       
      </div>
      <div className='flex items-center gap-x-1 '>
      <lable htmlfor ="numberInput">Include Numbers</lable>
          <input 
          type="checkbox"
          defaultChecked ={numberAllowed}
          className=''
           name="" 
           id="numberInput"
           onChange={() => {
            setNumberAllowed((prev) => !prev);
           }} />
           
        </div>
        <div className=' '>
        <lable  htmlfor="charInput">Include Symbols & Charactor</lable>
          <input 
          defaultChecked = {charAllowed}
          type="checkbox"
          className=' '
           name="" 
           id="charInput" 
           onCanPlay={() => {
            setCharAllowed((prev) => !prev);
           }}
           />
           
        </div>
    </div>
    </>
  )
}

export default App
