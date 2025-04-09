export interface Pet {
  id: number;
  user_uid: string;
  name: string;
  breed: string;
  image?: string; // Optional field
  dietary_requirements?: string; // Optional field
  medical_requirements?: string; // Optional field
  gender: string;
  birthdate: string; // Use `Date` if you want to handle it as a Date object
  vaccine_status: string;
  neutered: boolean;
}
