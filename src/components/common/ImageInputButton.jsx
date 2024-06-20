import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ImageInputButton({ image, inputHandler }) {
  return (
    <label htmlFor="imageUpload" className="w-[100px] my-2 mx-auto cursor-pointer rounded-full border-[3px] border-dashed border-white aspect-square flex justify-center items-center">
      {!image ? (
        <FontAwesomeIcon icon={faCamera} className="text-3xl" />
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
            width: '100px',
            height: '100px',
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