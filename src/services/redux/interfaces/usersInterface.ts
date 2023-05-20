interface IAdress {
    city: string;
    state: string;
    streetAddress: string;
    zip: string
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    description?: string;
    address?: IAdress;
}