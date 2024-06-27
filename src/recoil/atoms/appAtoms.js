import { atom } from 'recoil';

export const screenWidthAtom = atom({
    key: 'screenWidthAtom',
    default: window.innerWidth,
    effects: [
        ({ setSelf }) => {
            const handleResize = () => {
                setSelf(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            // Clean up the event listener on unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    ]
});