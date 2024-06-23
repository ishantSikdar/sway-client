export default function Wumpus() {
  return <div className="pb-3 flex flex-col justify-center gap-4 h-full px-1">
    <div className="h-[200px] w-full rounded-full" style={{
      backgroundImage: `url('/wumpus.svg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}></div>
    
    <div className="w-full text-center text-sm">
      <p>No one's around to play with Wumpus</p>
      <p>Try selecting a chat</p>
    </div>
  </div>
}