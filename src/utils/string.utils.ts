export function getString(str: string | undefined | null) {
    if (!str) return "";
    return str;
}

export function capitalizeFirstLetter(str: string | undefined | null) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}