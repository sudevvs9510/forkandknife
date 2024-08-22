
interface Restaurant {
  restaurantName: string;
  contact: string;
  place: string;

}

interface User {
  username: string;
  email: string;
  phone?: string | null;
}

interface Table {
  tableNumber: string;
  tableCapacity: number;
  tableLocation: string;

}
// BookingDetails.ts
export interface BookingDetails {
  bookingId: string;
  restaurantId: Restaurant;
  tableId: Table;
  userId: User;
  totalAmount: number;
  invoiceNumber: string;
  restaurantName: string;
  restaurantContact: string;
  restaurantPlace: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  items: {
    quantity: string;
    description: string;
    tax: number;
    price: number;
  }[];
}



