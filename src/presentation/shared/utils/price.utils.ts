export function discoutToActualPrice(
    price: string | number,
    discount: string | number
): string {
    if (isNumber(price) && isNumber(discount)) {
        const numPrice = typeof price === 'string' ? stringToNum(price) : price;
        const numDiscount =
            typeof discount === 'string' ? stringToNum(discount) : discount;
        return numToPrice(numPrice + numPrice * (numDiscount / 100));
    }
    return price as string;
}

export function isNumber(num: unknown): boolean {
    if (typeof num === 'number') {
        return num - num === 0;
    }
    if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
}

export function stringToNum(inputString: string): number {
    const parsedInt = parseInt(inputString, 10);
    const parsedFloat = parseFloat(inputString);
    return Number.isNaN(parsedInt) ? parsedFloat : parsedInt;
}

export function numToPrice(num: number): string {
    return num.toFixed(2);
}
