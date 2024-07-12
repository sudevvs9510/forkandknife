import { RestaurantType, tableSlotTypes, timeSlotTypes } from "../../../domain/entities/restaurant"
import { restaurantRepository } from "../../../domain/interfaces/repositories/restaurant-repository"
import restaurantModel from "../../../frameworks/database/models/restaurantModel"
import nodemailerEmailSeller from "../../../functions/sendMailSeller";
import restaurantTableModel from "../../../frameworks/database/models/restaurantTableModel"
import tableSlotsModel from "../../../frameworks/database/models/restaurantTableSlotsModel"
import restaurantTimeSlotSchema from "../../../frameworks/database/models/restaurantTimeSlotsModel"
import { generateAccessToken, generateRefreshToken } from "../../../functions/jwt"
import bcrypt from 'bcryptjs'



export class sellerRepository implements restaurantRepository {
   

   async create(restaurant: RestaurantType): Promise<{ restaurant: RestaurantType | null; message: string }> {
      console.log("inside create resto")
      try {
         console.log("inside create restaurant repo")
         const { restaurantName, email, password, contact, address, place, description, openingTime, closingTime, TableRate, featuredImage, secondaryImages } = restaurant;
         const newRestaurant = new restaurantModel({
            restaurantName,
            email,
            contact,
            password,
            address,
            place,
            description,
            openingTime,
            closingTime,
            TableRate,
            featuredImage,
            secondaryImages
         });
         await newRestaurant.save()
         if (newRestaurant) {
            nodemailerEmailSeller(restaurant.email)
            return { restaurant: newRestaurant.toObject(), message: "Restaurant registration successfull." }
         }
         return { restaurant: null, message: "Restaurant registration failed." }
      } catch (error) {
         console.error("Error in seller repository", error);
         throw error
      }
   }



   async findCredentials(data: Partial<RestaurantType>): Promise<{ restaurant: Partial<RestaurantType> | null; message: string; token: string | null, refreshtoken: string | null }> {
      console.log("Seller repository impl");
      const { email, password } = data
      try {
         const restaurant = await restaurantModel.findOne({ email: email });
         console.log(restaurant, email);
         let token = null, refreshtoken = null, message = '';
         if (!restaurant) {
            message = "User not found"
         } else {
            if (restaurant.isApproved) {
               const hashedPassword = await bcrypt.compare(password as string, restaurant.password);
               if (!hashedPassword) {
                  console.log('Password is not match');
                  message = 'Invalid password'
               } else {
                  token = generateAccessToken(restaurant._id.toString(), 'restaurant')
                  refreshtoken = generateRefreshToken(restaurant._id.toString(), 'restaurant')
                  console.log(token)
               }
            } else {
               message = "User not found"
            }
         }
         if (restaurant && !message) {
            return { restaurant: restaurant.toObject(), message: "Login successfull.", token, refreshtoken }
         }
         console.log(message)
         return { restaurant: null, message, token, refreshtoken }
      } catch (error) {
         console.error("Error in seller repository", error);
         throw error
      }
   }


   async restaurantAllDetails(restaurant: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>; message: string; }> {
      console.log("restaurantAllDetails")
      try {
         const { restaurantName, email, contact,
            address, description, location, place, openingTime,
            closingTime, TableRate, featuredImage, secondaryImages } = restaurant

         const coordinates: [number, number] = [
            parseFloat(location.coordinates[0]),
            parseFloat(location.coordinates[1]),
         ]
         console.log(restaurant)

         const existingRestaurantDetails = await restaurantModel.findOne({ email });

         let updatedSecondaryImages = existingRestaurantDetails?.secondaryImages || [];


         if (restaurant.secondaryImages.length > 0) {
            for (let i = 0; i < restaurant.secondaryImages.length; i++) {
               updatedSecondaryImages.push(restaurant.secondaryImages[i]);
            }
         }





         const restaurantDetails = await restaurantModel.findOneAndUpdate({ email }, {
            restaurantName,
            contact,
            address,
            description,
            place,
            location: { type: location.type, coordinates },
            openingTime,
            closingTime,
            TableRate,
            featuredImage,
            secondaryImages: updatedSecondaryImages
         }, { upsert: true, new: true })
         return { restaurant: restaurantDetails.toObject(), message: "restaurant details updated." }
      } catch (error) {
         console.error("Error in seller repository", error);
         throw error
      }
   }


   async getRestaurant(restaurantId: string): Promise<{ restaurant: any; message: string; }> {
      try {
         const restaurant = await restaurantModel.findById(restaurantId)
         console.log(restaurant)
         return { restaurant, message: "" }
      } catch (error) {
         console.log("Error occured in get restaurant: ", error)
         throw error
      }
   }

   //Restaurant table view repo
   async restaurantTableDatas(restaurantId: string): Promise<{ message: string; tableSlotDatas: object; }> {
      try {
         console.log(restaurantId)
         const tableSlotDatas = await restaurantTableModel.find({ restaurantId })
         console.log(tableSlotDatas)
         return { message: "", tableSlotDatas }
      } catch (error) {
         console.log("Error in table datas repository", error)
         throw error
      }
   }

   // restaurant table add modal repo
   async addNewTableSlot(tableSlotDatas: tableSlotTypes, restaurantId: string): Promise<{ message: string; status: boolean }> {
      try {
         console.log("object")
         const { tableNumber, tableCapacity, tableLocation } = tableSlotDatas
         console.log(restaurantId , tableSlotDatas)
         const restaurantData = await restaurantModel.findById(restaurantId)
         if (!restaurantData) {
            return { message: "Restaurant not found, please try again later", status: false }
         }

         const newTableSlot = await restaurantTableModel.create({
            restaurantId: restaurantData._id,
            tableNumber: tableNumber,
            tableCapacity: tableCapacity,
            tableLocation: tableLocation
         })
         console.log(newTableSlot);
         return { message: "Table created", status: true }
      } catch (error) {
         console.log("Error in add new table respository", error)
         return { message: "Somthing went wrong please try again later", status: false }

      }
   }





   //restaurant table slot view repo
   async restaurantTableSlotDatas(tableId: string): Promise<{ message: string; tableSlotDatas: object; }> {
      try {
         const tableSlotDatas = await tableSlotsModel.find({ tableId })
         return { message: "Successfull", tableSlotDatas }
      } catch (error) {
         console.log("Error in table slot repository", error)
         throw error
      }
   }


   //Restaurant table slot 
   async  addTableSlot(tableSlotTimeData: {slotStartTime: string; slotEndTime: string; tableSlotDate: Date}, tableId: string): Promise<{ message: string; status: boolean; }> {
      try{
         const tableSlotDatas = await tableSlotsModel.create({
            tableId: tableId,
            slotStartTime : tableSlotTimeData.slotStartTime,
            slotEndTime : tableSlotTimeData.slotEndTime,
            slotDate : tableSlotTimeData.tableSlotDate
         })
         console.log("Inserted Table Slot Data:", tableSlotDatas);
         return { message:"Added success.", status: true}
      } catch(error){
         console.log(error)
         throw error
      }
   }


   async restaurantTimeslotDatas(restaurantId: string): Promise<{ message: string; timeSlotDatas: object; }> {
      try{
         console.log(restaurantId)
         const timeSlotDatas = await restaurantTimeSlotSchema.find({ restaurantId })
         console.log("Time Slot Datas in repository:", timeSlotDatas);
         return { timeSlotDatas, message: ""}
      } catch(error){
         console.log(error)
         throw error
      }
   }


   async addTimeSlot(timeSlotDatas: timeSlotTypes): Promise<{ message: string, status: boolean }> {
      try{
         console.log()
         const { slotStartTime, slotEndTime, restaurantId } = timeSlotDatas
         console.log("Time slot data received:", slotStartTime, slotEndTime, restaurantId);

         const restaurantData = await restaurantModel.findById(restaurantId)
         if(!restaurantData){
            return { message: "Restaurant not found, please try again later", status: false }
         }

         const newTimeSlot = await restaurantTimeSlotSchema.create({
            restaurantId: restaurantData._id,
            slotStartTime: slotStartTime,
            slotEndTime: slotEndTime
         })
         console.log("New time slot created:", newTimeSlot);
         return { message: "Time sot created", status: true }

      } catch(error){
         console.log(error)
         throw error
      }
   }







}
