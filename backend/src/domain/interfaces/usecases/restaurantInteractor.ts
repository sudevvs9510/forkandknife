import { RestaurantType, tableSlotTypes, timeSlotTypes } from "../../entities/restaurant"

export interface restaurantInteractor{
   restaurantRegistration(credentials: RestaurantType): Promise<{restaurant: object | null, message: string}>
   restaurantLogin(data: Partial<RestaurantType>): Promise<{restaurant: Partial<RestaurantType> | null; message: string; token: string | null, refreshtoken: string | null}>
   restaurantDetailsUpdateInteractor(credentials: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>, message: string}>
   restaurantGetProfileInteractor(_id: string): Promise<{restaurant: object}>

   removeFeaturedImageInteractor(restaurantId: string, featuredImage:string): Promise <{ message: string, status: boolean}>
   removeSecondaryImageInteractor(restaurantId: string, secondaryImage:string): Promise <{ message: string, status: boolean}>

   getRestaurantTableInteractor(restaurantId : string) : Promise<{ message: string; tableSlotDatas: object }>
   addTableInteractor(tableSlotDatas: tableSlotTypes, restaurantId: string): Promise<{message: string, status: boolean}>
   deleteTableInteractor(tableId: string, restaurantId: string): Promise<{ message: string, status: boolean}>

   getRestaurnatTableSlotInteractor( tableId : string): Promise<{ message: string; tableSlotDatas : object}>
   getBookingDetailsInteractor( restaurantId : string): Promise<{ message: string; bookingDatas: object}>
   addTableSlotInteractor( tableSlotTimeDatas: object , tableId: string) : Promise<{message: string; status: boolean}>
   deleteTableSlotInteractor( restaurantId: string, tableSlotId: string): Promise<{ message: string, status: boolean}>

   getTimeSlotInteractor( restaurantId : string ) : Promise<{ message: string,timeSlotDatas: object}>
   addTimeSlotInteractor(timeSlotDatas: timeSlotTypes ) : Promise<{ message: string, status: boolean}>
   deleteTimeSlotInteractor( timeSlotId: string, restaruantId: string) : Promise<{ message: string, status: boolean }>
   
   getReservationDetailsInteractor(bookingId: string) : Promise<{ message: string,reservationDatas: object | null }>
   updateBookingStatusInteractor(bookingId: string, bookingStatus: string): Promise<{ message: string, status: boolean}>


   dashboardInteractor(restaruantId: string, month: number): Promise<{ message:string, status: boolean , totalRevenue: number; totalBookingCount: number; totalBookingPaidCount: number; totalCompletedBookingCount: number; totalConfirmedBookingCount: number;totalPendingBookingCount:number, totalCancelledBookingCount: number, reviewCount:number, dailyRevenue: object,  }>

   downloadReportInteractor(restaurantId: string, period: string):Promise<{ message: string, status: boolean, doc?:PDFKit.PDFDocument}>
   
}