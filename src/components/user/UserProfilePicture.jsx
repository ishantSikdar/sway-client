import { getInitials } from "../../utils/stringUtil"

export default function UserProfilePicture({ name, imageUrl, size }) {

  const initials = getInitials(name);

  const imageAbsent = () => {
    return !imageUrl || imageUrl.slice(0,9) === 'undefined';
  }

  return (
    <div
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className={`${imageAbsent() ? 'bg-purple-800' : 'bg-midDark'}  h-full w-full flex justify-center items-center`}
    >
      {imageAbsent() &&
        <p style={{ fontSize: size }} className="text-frostWhite font-bold">{initials}</p>}
    </div>
  )
}