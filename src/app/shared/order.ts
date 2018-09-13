export interface Order {
  id: number;
  dishIds: number[];
  date: Date;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  telephone: number;
  email: string;
  state: string;
}
