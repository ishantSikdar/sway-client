import { useRef, useEffect } from 'react'

export default function SearchTextBox({ handleInput }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <input ref={inputRef} type="text" name="searchTag" placeholder="Try typing a subject..." className=" text-sm outline-none bg-inherit px-6 flex-grow" autoComplete="off" onChange={handleInput} />
  )
}