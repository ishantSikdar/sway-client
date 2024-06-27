import { getInitials } from "../../utils/stringUtil"

export default function UserProfilePicture({ name, imageUrl, size }) {

  const initials = getInitials(name);

  return (
    <div
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className={`bg-purple-800 h-full w-full flex justify-center items-center`}
    >
      {!imageUrl &&
        <p style={{ fontSize: size }} className="text-white z-50 font-extrabold">{initials}</p>}
    </div>
  )
}