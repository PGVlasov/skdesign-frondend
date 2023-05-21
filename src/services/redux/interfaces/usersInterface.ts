interface Adress {
  city: string;
  state: string;
  streetAddress: string;
  zip: string
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description?: string;
  address?: Adress;
}