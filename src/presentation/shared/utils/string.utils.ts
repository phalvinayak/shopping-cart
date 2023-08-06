export function capitalize(
    category: string,
    splitChar: string = '-',
    joinChar: string = ' '
): string {
    if (!category) {
        return category;
    }
    return category
        .split(splitChar)
        .map((word: string) => ucFirst(word))
        .join(joinChar);
}

function ucFirst(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
