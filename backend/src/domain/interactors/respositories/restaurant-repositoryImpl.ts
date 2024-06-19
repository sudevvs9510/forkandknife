import { RestaurantType } from "../../../domain/entities/restaurant"
import { restaurantRepository } from "../../../domain/interfaces/repositories/restaurant-repository"
import restaurantModel from "../../../frameworks/database/models/restaurantModel"
import nodemailerEmailSeller from "../../../functions/sendMailSeller";
import { generateAccessToken } from "../../../functions/jwt"
import bcrypt from 'bcryptjs'

export class sellerRepository implements restaurantRepository {

   async create(restaurant: RestaurantType): Promise<{ restaurant: RestaurantType | null; message: string }> {
      console.log("inside create resto")
      try {
         console.log("inside create restaurant repo")
         const { restaurantName, email, password, contact, address, description, openingTime, closingTime, TableRate, featuredImage, secondaryImages } = restaurant;
         const newRestaurant = new restaurantModel({
            restaurantName,
            email,
            contact,
            password,
            address,
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



   async findCredentials(data: Partial<RestaurantType>): Promise<{ restaurant: Partial<RestaurantType> | null; message: string; token: string | null }> {
      console.log("Seller repository impl");
      const { email, password } = data
      try {
         const restaurant = await restaurantModel.findOne({ email: email });
         console.log(restaurant, email);
         let token = null, message = '';
         if (!restaurant) {
            message = "User not found"
         } else {
            if (restaurant.isApproved) {
               const hashedPassword = await bcrypt.compare(password as string, restaurant.password);
               if (!hashedPassword) {
                  console.log('Password is not match');
                  message = 'Invalid password'
               } else {
                  token = generateAccessToken(restaurant.email as string)
                  console.log(token)
               }
            } else {
               message = "User not found"
            }
         }
         if (restaurant && !message) {
            return { restaurant: restaurant.toObject(), message: "Login successfull.", token }
         }
         console.log(message)
         return { restaurant: null, message, token }
      } catch (error) {
         console.error("Error in seller repository", error);
         throw error
      }
   }


   async restaurantAllDetails(restaurant: RestaurantType): Promise<{ restaurant: Partial<RestaurantType>; message: string; }> {
      try {
         const { restaurantName, email, contact,
            address, description, location, openingTime,
            closingTime, TableRate, featuredImage, secondaryImages } = restaurant

         const coordinates : [number, number] = [
            parseFloat(location.coordinates[0]),
            parseFloat(location.coordinates[1]),
         ]
         console.log(restaurant)
         const restaurantDetails = await restaurantModel.findOneAndUpdate({ email }, {
            restaurantName,
            contact,
            address,
            description,
            location: { type: location.type, coordinates },
            openingTime,
            closingTime,
            TableRate,
            featuredImage,
            secondaryImages
         },{upsert: true, new: true})
         return { restaurant: restaurantDetails.toObject(), message:"restaurant details updated."}
      } catch (error) {
         console.error("Error in seller repository", error);
         throw error
      }
   }


}
