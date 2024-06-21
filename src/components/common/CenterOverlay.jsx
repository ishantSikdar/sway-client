export default function CenterOverlay({ children, bgClickHandler }) {
  return (
    <div onClick={bgClickHandler} className='z-30 fixed inset-0 flex justify-center items-center bg-opacity-80 bg-black'>
      {children}
    </div>
  )
}