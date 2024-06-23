export default function SearchTextBox({ handleInput }) {
  return (
    <input type="text" name="searchTag" placeholder="Try typing a subject..." className=" text-sm outline-none bg-gray px-6 flex-grow" onChange={handleInput} />
  )
}