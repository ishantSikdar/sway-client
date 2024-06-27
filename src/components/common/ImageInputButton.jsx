import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ImageInputButton({ image, inputHandler }) {
  return (
    <label htmlFor="imageUpload" className="w-full my-2 cursor-pointer rounded-full  aspect-square flex justify-center items-center">
      {!image ? (
        <div className="w-full h-full bg-black rounded-full flex justify-center items-center">
          <FontAwesomeIcon icon={faCamera} className="text-3xl" />
        </div>
      ) : (
        <img
          src={URL.createObjectURL(image)}
          alt="Profile pic"
          className="rounded-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <input
        type="file"
        id="imageUpload"
        className="hidden"
        name="image"
        onChange={inputHandler}
      />
    </label>
  )
}