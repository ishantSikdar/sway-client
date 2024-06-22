export default function SearchTextBox({ handleInput }) {
  return (
    <input type="text" name="searchTag" placeholder="Try typing a subject..." className=" text-sm outline-none bg-gray py-4 px-6 w-full" onChange={handleInput} />
  )
}