export interface Geolocation {
  lat: number;
  long: number;
}

export interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  geolocation: Geolocation; // ✅ Ajustado para lat e long
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Customer';
  status: 'Active' | 'Inactive';
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}
