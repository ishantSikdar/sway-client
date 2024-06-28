import UserProfilePicture from "../user/UserProfilePicture";

export default function MemberCard({ id, name, imageUrl, username }) {
  return (
    <button className="w-full py-3 px-3 flex items-center gap-4 hover:bg-light-gray rounded-md">
      <div className="w-12 aspect-square rounded-full overflow-hidden">
        <UserProfilePicture imageUrl={imageUrl} name={name} />
      </div>

      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-full text-left">
        {username}
      </p>
    </button>
  )
}