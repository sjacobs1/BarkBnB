export function formatCellphoneNumber(cellNumber: string | undefined) {
    if (!cellNumber || cellNumber.length < 9) {
      return cellNumber ?? ""; // Return empty string if undefined
    }
  
    const cleanedNumber = cellNumber.replace(/\D/g, ""); // Remove non-numeric characters
  
    return `${cleanedNumber.slice(0, 3)} ${cleanedNumber.slice(3, 6)} ${cleanedNumber.slice(6)}`;
  }
  