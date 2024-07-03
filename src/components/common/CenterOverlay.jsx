export default function CenterOverlay({ children }) {
  return (
    <div className='z-30 fixed inset-0 flex justify-center items-center bg-opacity-80 bg-dark-blue'>
      {children}
    </div>
  )
}