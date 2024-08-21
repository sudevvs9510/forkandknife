import { UserType } from "../../entities/User"
import { AdminRepositories } from "../../interfaces/repositories/admin-repository";
import UserModel from "../../../frameworks/database/models/userModel"
import bcrypt from "bcryptjs"
import restaurantModel from "../../../frameworks/database/models/restaurantModel";
import nodeMailerRestaurantApprovalMail from "../../../functions/sendMailApproval"
import nodeMailerRestaurantRejectMail from "../../../functions/restoRejectMail"
import { generateAccessToken, generateRefreshToken } from "../../../functions/jwt";
import userModel from "../../../frameworks/database/models/userModel";
import bookingModel from "../../../frameworks/database/models/bookingModel";
import PDFDocument from 'pdfkit-table';


export class adminRepositoryImpl implements AdminRepositories {


   async adminLoginRepo(credentials: { email: string; password: string; }): Promise<{ admin: UserType | null; message: string; token: string | null; refreshToken: string | null }> {
      try {
         console.log("inside interactor repo")
         const admin = await UserModel.findOne({ email: credentials.email })
         console.log(admin)
         let token = null;
         let refreshToken = null;

         if (!admin || !admin.isAdmin) {
            return { admin, message: "Admin doesn't exist", token, refreshToken }
         } else {
            const isPasswordMatch = await bcrypt.compare(credentials.password, admin.password)
            if (isPasswordMatch) {
               if (admin) {
                  token = generateAccessToken(admin._id.toString(), "admin");
                  refreshToken = generateRefreshToken(admin._id.toString(), 'admin')
                  console.log(token)
               }
               return { admin, message: "Admin Login Successfull", token, refreshToken }
            } else {
               return { admin, message: "Incorrect password", token, refreshToken }
            }
         }
      } catch (error: any) {
         console.error("Error in admin Login Repo:", error);
         throw error
      }
   }

   async getRestaurantLists(): Promise<{ restaurants: object | null; message: string; }> {
      try {
         const restaurants = await restaurantModel.find({ isApproved: true })
         return { restaurants, message: " restaurant list successfull" }
      } catch (error) {
         console.error("Error in get restaurant repository", error);
         throw error

      }
   }

   async blockRestaurant(restaurantId: string, isBlocked: boolean): Promise<{ message: string; status: boolean; }> {
      try {
         const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId, { isBlocked }, { new: true })
         console.log(restaurant)
         if (restaurant) {
            console.log(restaurant)
            return { message: "User blocked successfully", status: true }
         } else {
            return { message: "restaurant not found", status: false }
         }
      } catch (error) {
         console.log(error)
         throw error
      }
   }



   async approve(): Promise<{ restaurants: object | null; message: string; }> {
      try {
         const restaurants = await restaurantModel.find({ isApproved: false })
         console.log(restaurants)
         return { restaurants, message: "restaurant list successfull" }
      } catch (error) {
         console.error("Error in get restaurant approve repository:", error);
         throw error
      }
   }

   async getApprovalRestaurant(restaurantId: string): Promise<{ restaurants: object | null; message: string; }> {
      try {
         const restaurantDetails = await restaurantModel.findById(restaurantId)
         console.log(restaurantDetails)
         return { restaurants: restaurantDetails, message: "Restaurant details" }
      } catch (error) {
         console.log("Error in getApprovalRestaurant repository", error);
         throw error

      }
   }


   async confirmRestaurantApproval(restaurantId: string): Promise<{ success: boolean; message: string; }> {
      try {
         const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId, { isApproved: true });
         console.log(restaurant)
         nodeMailerRestaurantApprovalMail(restaurant?.email as string)
         return { success: true, message: "Success" }
      } catch (error) {
         console.log("Error occured in restaurant approval/confirmation", error)
         throw error
      }
   }


   async confirmRestaurantRejection(restaurantId: string): Promise<{ success: boolean; message: string; }> {
      try {
         const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId, { isApproved: false })
         console.log(restaurant)
         nodeMailerRestaurantRejectMail(restaurant?.email as string)
         return { success: true, message: "Success" }
      } catch (error) {
         console.log("Error occured in restaurant rejection", error)
         throw error
      }
   }

   async getUserLists(): Promise<{ users: object | null; message: string; }> {
      try {
         const users = await userModel.find({ isVerified: true })
         console.log(users)
         return { users, message: "User list successfull" }
      } catch (error) {
         console.log(error)
         throw error
      }
   }


   async blockUser(userId: string, isBlocked: boolean): Promise<{ message: string; status: boolean; }> {
      try {
         const user = await userModel.findByIdAndUpdate(userId, { isBlocked }, { new: true })
         console.log(user)
         if (user) {
            console.log(user);
            return { message: "User blocked successfully", status: true };
         } else {
            return { message: "User not found", status: false };
         }
      } catch (error) {
         console.log(error)
         throw error
      }
   }

   async adminDashboard(): Promise<{
      message: string;
      status: boolean;
      usersCount: number;
      restaurantsCount: number;
      bookingCount: number;
      sortedRevenueByRestaurantObject: object,
      bookingCountCompleted: number,
      bookingCountConfirmed: number,
      bookingCountCancelled: number

   }> {
      try {
         const usersCount = await userModel.countDocuments({ role: "user" });
         const restaurantsCount = await restaurantModel.countDocuments({ role: "seller" });
         console.log("usersCount:", usersCount, "restaurantsCount:", restaurantsCount);

         // const bookingCount = await bookingModel.countDocuments({ paymentStatus: "PAID" });
         const bookingCount = await bookingModel.countDocuments();

         const bookingCountCancelled = await bookingModel.countDocuments({ bookingStatus: "CANCELLED" });
         console.log("cancelled booking count:", bookingCountCancelled)

         const bookingCountConfirmed = await bookingModel.countDocuments({ bookingStatus: "CONFIRMED" });
         console.log("confirmed booking count:", bookingCountConfirmed)

         console.log("bookingCount:", bookingCount);

         const bookingCountCompleted = await bookingModel.countDocuments({ bookingStatus: "COMPLETED" })
         console.log("bookingCompletedCount:", bookingCountCompleted);

         const currentDayRevenue = await bookingModel.aggregate([
            {
               $match: { paymentStatus: "PAID", bookingStatus: "COMPLETED" }
            },
            {
               $group: {
                  _id: null,
                  totalRevenue: { $sum: "$totalAmount" }
               }
            }
         ]);

         const revenue = currentDayRevenue.length > 0 ? currentDayRevenue[0].totalRevenue : 0;
         console.log(`Total Revenue for Paid Bookings: ${revenue}`);


         // Get revenue by each restaurant, using restaurantName as key
         const bookingDetailsByEachRestaurant = await bookingModel.aggregate([
            {
               $match: {
                  paymentStatus: "PAID",
                  bookingStatus: "COMPLETED"
               }
            },
            {
               $lookup: {
                  from: "restaurants",
                  localField: "restaurantId",
                  foreignField: "_id",
                  as: "restaurantDetails"
               }
            },
            {
               $unwind: "$restaurantDetails"
            },
            {
               $group: {
                  _id: "$restaurantDetails.restaurantName",
                  totalRevenue: { $sum: "$totalAmount" }
               }
            }
         ]);

         console.log("bookingDetailsByEachRestaurant:", bookingDetailsByEachRestaurant)

         // Transforming the result into an object with restaurantName as keys
         const revenueByRestaurantObject: { [restaurantName: string]: number } = {};
         bookingDetailsByEachRestaurant.forEach((item) => {
            revenueByRestaurantObject[item._id] = item.totalRevenue;
         });

         // Sort the object by revenue in descending order
         const sortedRevenueArray = Object.entries(revenueByRestaurantObject).sort(([, a], [, b]) => b - a);
         const sortedRevenueByRestaurantObject = Object.fromEntries(sortedRevenueArray);

         console.log(sortedRevenueByRestaurantObject);



         return {
            message: "Fetched data successfully",
            status: true,
            usersCount,
            restaurantsCount,
            bookingCount,
            sortedRevenueByRestaurantObject,
            bookingCountCompleted,
            bookingCountConfirmed,
            bookingCountCancelled


         };
      } catch (error) {
         console.log(error);
         throw error;
      }
   }

   async downloadAdminReport(period: string): Promise<{ message: string; status: boolean; doc?: PDFKit.PDFDocument; }> {
      try {
         const reportDatas = await this.getAdminDashboardData(period);
         console.log(reportDatas);

         const doc = new PDFDocument();

         const startDateStr = reportDatas.startDate.toLocaleDateString();
         const endDateStr = reportDatas.endDate.toLocaleDateString();

         // Title and period
         doc.fontSize(20).text(`Admin Report - ${period}`, { align: 'center' });
         doc.moveDown();
         doc.fontSize(12).text(`Time period: ${startDateStr} - ${endDateStr}`, { align: 'center' });
         doc.moveDown();

         // Report summary
         doc.text(`Total Revenue: INR ${reportDatas.revenue.toFixed(2)}`);
         doc.moveDown();
         doc.text(`Admin Profit (12%): INR ${reportDatas.adminProfit.toFixed(2)}`);
         doc.moveDown();
         doc.text(`Total users: ${reportDatas.usersCount}`);
         doc.moveDown();
         doc.text(`Total Restaurants: ${reportDatas.restaurantsCount}`);
         doc.moveDown();
         doc.text(`Total Bookings: ${reportDatas.bookingCount}`);
         doc.moveDown();
         doc.text(`Revenue & Bookings by Restaurants:`);
         doc.moveDown();

         // Booking details table
         const table = {
            headers: ['Restaurant Name', 'Total Revenue', 'Total Bookings', 'Completed Bookings', 'Cancelled Bookings', 'Pending Bookings', 'Confirmed Bookings'],
            rows: reportDatas.bookingDetailsArray.map(item => [
               item.restaurantName,
               `INR ${item.totalRevenue.toFixed(2)}`,
               item.totalBookings,
               item.completedBookings,
               item.cancelledBookings,
               item.pendingBookings,
               item.confirmedBookings
            ])
         };

         // Render the table using pdfkit-table
         await doc.table(table, {
            prepareHeader: () => doc.fontSize(10).font('Helvetica-Bold'),
            prepareRow: (row, i) => doc.fontSize(8).font('Helvetica')
         });


         return { message: "Report generated successfully", status: true, doc };
      } catch (error) {
         console.log(error);
         throw error;
      }
   }



   private async getAdminDashboardData(period: string) {
      console.log("getAdminDashboardData")

      let startDate: Date;
      let endDate: Date;
      const now = new Date();

      switch (period) {
         case 'Week':
            startDate = new Date(now.setDate(now.getDate() - now.getDay()));
            endDate = new Date(now.setDate(startDate.getDate() + 7));
            break;
         case 'Month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
         case 'Yearly':
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear() + 1, 0, 0);
            break;
         default:
            throw new Error('Invalid period');
      }

      const usersCount = await userModel.countDocuments({ role: "user" });
      const restaurantsCount = await restaurantModel.countDocuments({ role: "seller" });
      const bookingCount = await bookingModel.countDocuments({ paymentStatus: "PAID" });
      console.log("bookingCount:", bookingCount, usersCount, restaurantsCount);
      const currentDayRevenue = await bookingModel.aggregate([
         {
            $match: { paymentStatus: "PAID", bookingStatus: "COMPLETED" }
         },
         {
            $group: {
               _id: null,
               totalRevenue: { $sum: "$totalAmount" }
            }
         }
      ]);

      const revenue = currentDayRevenue.length > 0 ? currentDayRevenue[0].totalRevenue : 0;
      console.log(`Total Revenue for Paid Bookings: ${revenue}`);
      
      // Get revenue by each restaurant, using restaurantName as key
      const bookingDetailsByEachRestaurant = await bookingModel.aggregate([
         {
            $lookup: {
               from: "restaurants",
               localField: "restaurantId",
               foreignField: "_id",
               as: "restaurantDetails"
            }
         },
         {
            $unwind: "$restaurantDetails"
         },
         {
            $group: {
               _id: "$restaurantDetails.restaurantName",
               totalRevenue: {
                  $sum: {
                      $cond: [
                          {
                              $and: [
                                  { $eq: ["$paymentStatus", "PAID"] },
                                  { $in: ["$bookingStatus", ["COMPLETED", "CONFIRMED"]] }
                              ]
                          },
                          "$totalAmount",
                          0
                      ]
                  }
              },
               totalBookings: { $sum: 1 },
               completedBookings: {
                  $sum: {
                     $cond: [{ $eq: ["$bookingStatus", "COMPLETED"] }, 1, 0]
                  }
               },
               cancelledBookings: {
                  $sum: {
                     $cond: [{ $eq: ["$bookingStatus", "CANCELLED"] }, 1, 0]
                  }
               },
               pendingBookings: {
                  $sum: {
                     $cond: [{ $eq: ["$bookingStatus", "PENDING"] }, 1, 0]
                  }
               },
               confirmedBookings: {
                  $sum: {
                     $cond: [{ $eq: ["$bookingStatus", "CONFIRMED"] }, 1, 0]
                  }
               }
            }
         }
      ]);

      console.log("bookingDetailsByEachRestaurant:", bookingDetailsByEachRestaurant)

      // Transform the result into an array of objects
      const bookingDetailsArray = bookingDetailsByEachRestaurant.map((item) => ({
         restaurantName: item._id,
         totalRevenue: item.totalRevenue,
         totalBookings: item.totalBookings,
         completedBookings: item.completedBookings,
         cancelledBookings: item.cancelledBookings,
         pendingBookings: item.pendingBookings,
         confirmedBookings: item.confirmedBookings,
      }));

      const adminProfit = revenue * 0.12;

      return {
         usersCount,
         restaurantsCount,
         bookingCount,
         revenue,
         bookingDetailsArray,
         startDate,
         endDate,
         adminProfit

      }
   }

}

