
export class RestaurantType {
   constructor(
       public readonly restaurantName: string,
       public readonly email:string,
       public readonly restaurantType: "Veg & Non-Veg" | "Veg" | "Non-Veg",
       public readonly contact: string,
       public readonly address: string,
       public readonly password: string,
       public readonly description: string,
       public readonly openingTime: string,
       public readonly place : string,
       public readonly location: {type:string,coordinates : [string , string]},
       public readonly closingTime: string,
       public readonly TableRate: string,
       public readonly featuredImage: string,
       public readonly secondaryImages: string ,

   ){}
}


export interface tableSlotTypes{
    restaurantId: string;
    tableId: string;
    tableNumber: string,
    tableCapacity: number;
    tableLocation: "Indoor" | "Outdoor"
}

export interface timeSlotTypes{
    restaurantId: string;
    timeSlotId: string;
    slotStartTime: string;
    slotEndTime: string;
}