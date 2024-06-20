import CenterOverlay from "./CenterOverlay";

export default function GrayContainer({ children, close, closeLabel, submit, submitLabel, width }) {
  return (
    <CenterOverlay>
      <div>
        <div className={`bg-midDark p-5 rounded-t-md ${width && `w-[${width}px]` }`}>
          {children}
        </div>

        <div className="bg-light-black w-full rounded-b-md p-4 flex justify-between">
          {close && closeLabel && <button onClick={close} className="px-3 py-3 rounded-md">
            {closeLabel}
          </button>}

          {submit && submitLabel && <button onClick={submit} className="bg-blue px-6 py-3 rounded-md">
            {submitLabel}
          </button>}
        </div>
      </div>
    </CenterOverlay>
  )
}