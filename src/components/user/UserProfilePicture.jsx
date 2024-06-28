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
      className={`bg-white  h-full w-full flex justify-center items-center`}
    >
      {imageUrl.slice(0,9) === 'undefined' &&
        <p style={{ fontSize: size }} className="text-black z-50 font-extrabold">{initials}</p>}
    </div>
  )
}