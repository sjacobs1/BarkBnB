export function getAge(
  birthDateInput: string | Date
): { years: number; months: number } | null {
  const birthDate =
    birthDateInput instanceof Date ? birthDateInput : new Date(birthDateInput);

  if (isNaN(birthDate.getTime())) {
    console.warn("Invalid birth date");
    return null;
  }

  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (today.getDate() < birthDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}
