export const formatTimeToHHMMSS = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
};

export function hhMMssToSeconds(hh, mm, ss) {
    const hours = parseInt(hh);
    const mins = parseInt(mm);
    const secs = parseInt(ss);
    return (hours * 3600) + (mins * 60) + secs;
}

export function gradeFocusLevel(focusFactor) {

    if (isNaN(focusFactor)) {
        return '?';
    } else if (focusFactor >= 90) {
        return 'A';
    } else if (focusFactor >= 80) {
        return 'B';
    } else if (focusFactor >= 70) {
        return 'C';
    } else if (focusFactor >= 60) {
        return 'D';
    } else if (focusFactor >= 50) {
        return 'E';
    } else if (focusFactor >= 0) {
        return 'F';
    } else {
        return 'F'
    }
}