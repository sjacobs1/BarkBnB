export function formatCellphoneNumber(cellNumber: string | undefined) {
    return `${cellNumber?.slice(0, 3)} ${cellNumber?.slice(3, 6)} ${cellNumber?.slice(6)}`;
}