// Convierte una fecha en formato ISO 8601 a formato DD/MM/YYYY.
export const formatReleaseDate = (releaseDateISO8601: string): string => {
    const releaseDate = new Date(releaseDateISO8601);
    return `${releaseDate.getDate()}/${releaseDate.getMonth() + 1}/${releaseDate.getFullYear()}`;
};

//Convierte milisegundos en una cadena de tiempo en formato HH:MM:SS.
export const formatTrackTime = (millis: number): string => {
    const hours = Math.floor(millis / 3600000);
    const minutes = Math.floor((millis % 3600000) / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};