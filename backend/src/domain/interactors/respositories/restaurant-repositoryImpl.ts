import { RestaurantType, tableSlotTypes, timeSlotTypes } from "../../../domain/entities/restaurant"
import { restaurantRepository } from "../../../domain/interfaces/repositories/restaurant-repository"
import restaurantModel from "../../../frameworks/database/models/restaurantModel"
import nodemailerEmailSeller from "../../../functions/sendMailSeller";
import restaurantTableModel from "../../../frameworks/database/models/restaurantTableModel"
import tableSlotsModel from "../../../frameworks/database/models/restaurantTableSlotsModel"
import restaurantTimeSlotsModel from "../../../frameworks/database/models/restaurantTimeSlotsModel"
import { generateAccessToken, generateRefreshToken } from "../../../functions/jwt"
import bcrypt from 'bcryptjs'
import bookingModel from "../../../frameworks/database/models/bookingModel";
import reviewModel from "../../../frameworks/database/models/reviewModel";
import PDFDocument from 'pdfkit-table';




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
         const { restaurantName, email, contact, restaurantType,
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
            restaurantType,
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

   async removeFeaturedImage(restaurantId: string, featuredImage: string): Promise<{ message: string; status: boolean; }> {
      try {
         const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            restaurantId,
            { $set: { featuredImage: "" } },
            { new: true }
         );

         if (!updatedRestaurant) {
            return { message: "Restaurant not found", status: false };
         }

         return { message: "Featured image removed", status: true };
      } catch (error) {
         console.log(error);
         throw error;
      }
   }

   async removeSecondaryImage(restaurantId: string, secondaryImage: string): Promise<{ message: string; status: boolean; }> {
      try {
         const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            restaurantId,
            { $pull: { secondaryImages: secondaryImage } },
            { new: true }
         );

         if (!updatedRestaurant) {
            return { message: "Restaurant not found", status: false };
         }

         return { message: "Secondary image removed", status: true };
      } catch (error) {
         console.log(error);
         throw error;
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


   async getBookingDetails(restaurantId: string): Promise<{ message: string; bookingDatas: object; }> {
      try {
         console.log(restaurantId)
         const bookingDatas = await bookingModel.find({ restaurantId })
            .populate('userId', 'username email',)
            .populate('tableId', 'tableNumber tableCapacity tableLocation')
            .sort({ createdAt: -1 })

         console.log(bookingDatas)
         return { message: "", bookingDatas }
      } catch (error) {
         console.log("Error in fetching getBooking datas", error)
         throw error
      }
   }

   // restaurant table add modal repo
   async addNewTableSlot(tableSlotDatas: tableSlotTypes, restaurantId: string): Promise<{ message: string; status: boolean }> {
      try {
         console.log("add table repo")
         const { tableNumber, tableCapacity, tableLocation } = tableSlotDatas
         console.log(restaurantId, tableSlotDatas)
         const restaurantData = await restaurantModel.findById(restaurantId)
         if (!restaurantData) {
            return { message: "Restaurant not found, please try again later", status: false }
         }

         const existingTable = await restaurantTableModel.findOne({
            restaurantId: restaurantData._id,
            tableNumber: tableNumber,
         });

         console.log(existingTable)

         if (existingTable) {
            return { message: "Table number already exists.", status: false };
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
         return { message: "Something went wrong please try again later", status: false }

      }
   }


   //restaurant table delete 
   async deleteTableSlot(tableId: string, restaurantId: string): Promise<{ message: string; status: boolean; }> {
      try {
         console.log("delete table repo")

         const restaurantData = await restaurantModel.findById(restaurantId)
         if (!restaurantData) {
            return { message: "Restaurant not found, please try again later", status: false }
         }
         const deleteTableSlot = await restaurantTableModel.deleteOne({
            _id: tableId,
            restaurantId: restaurantData._id,
         })
         console.log(deleteTableSlot);
         return { message: "Table deleted", status: true }
      } catch (error) {
         console.log("Error in delete table respository", error)
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


   //Restaurant add table slot 
   async addTableSlot(tableSlotTimeData: { slotStartTime: string; slotEndTime: string; tableSlotDate: Date }, tableId: string): Promise<{ message: string; status: boolean; }> {
      try {

         const existingSlot = await tableSlotsModel.findOne({
            tableId: tableId,
            slotStartTime: tableSlotTimeData.slotStartTime,
            slotEndTime: tableSlotTimeData.slotEndTime,
            slotDate: tableSlotTimeData.tableSlotDate
         });

         console.log(existingSlot)

         if (existingSlot) {
            return { message: "Table slot already exists.", status: false };
         }

         const tableSlotDatas = await tableSlotsModel.create({
            tableId: tableId,
            slotStartTime: tableSlotTimeData.slotStartTime,
            slotEndTime: tableSlotTimeData.slotEndTime,
            slotDate: tableSlotTimeData.tableSlotDate
         })
         console.log("Inserted Table Slot Data:", tableSlotDatas);
         return { message: "Added success.", status: true }
      } catch (error) {
         console.log(error)
         throw error
      }
   }

   //Restaurant table delete slot 
   async deleteTableTimeSlot(restaurantId: string, tableSlotId: string): Promise<{ message: string; status: boolean; }> {
      try {
         const deleteTableSlot = await tableSlotsModel.deleteOne({
            _id: tableSlotId,
            restaurantId: restaurantId,
         })
         console.log('Deleted table slot:', deleteTableSlot);

         if (deleteTableSlot.deletedCount === 1) {
            return { message: 'Table slot deleted', status: true };
         } else {
            return { message: 'Table slot not found or not deleted', status: false };
         }
      } catch (error) {
         console.error('Error deleting table slot:', error);
         throw error
      }
   }


   async restaurantTimeslotDatas(restaurantId: string): Promise<{ message: string; timeSlotDatas: object; }> {
      try {
         console.log(restaurantId)
         const timeSlotDatas = await restaurantTimeSlotsModel.find({ restaurantId })
         console.log("Time Slot Datas in repository:", timeSlotDatas);
         return { timeSlotDatas, message: "" }
      } catch (error) {
         console.log(error)
         throw error
      }
   }


   async addTimeSlot(timeSlotDatas: timeSlotTypes): Promise<{ message: string, status: boolean }> {
      try {
         console.log("Repository received data:", timeSlotDatas);
         const { slotStartTime, slotEndTime, restaurantId } = timeSlotDatas
         console.log("Time slot data received:", slotStartTime, slotEndTime, restaurantId);

         const restaurantData = await restaurantModel.findById(restaurantId)
         if (!restaurantData) {
            return { message: "Restaurant not found, please try again later", status: false }
         }

         if (slotStartTime >= slotEndTime) {
            return { message: "End time must be after start time", status: false }
         }

         const newTimeSlot = await restaurantTimeSlotsModel.create({
            restaurantId: restaurantData._id,
            slotStartTime: slotStartTime,
            slotEndTime: slotEndTime
         })
         console.log("New time slot created:", newTimeSlot);
         return { message: "Time sot created", status: true }

      } catch (error) {
         console.log(error)
         throw error
      }
   }

   async deleteTimeSlot(timeSlotId: string): Promise<{ message: string; status: boolean; }> {
      try {
         const timeSlotData = await restaurantTimeSlotsModel.findById(timeSlotId)
         console.log("Repository timeSlotData:", timeSlotData);

         if (!timeSlotData) {
            return { message: "Time slot not found, please try again later", status: false }
         }
         const restaurantId = timeSlotData.restaurantId
         console.log("Restaurant ID:", restaurantId);

         const deletedTimeSlot = await restaurantTimeSlotsModel.findByIdAndDelete(timeSlotId)
         console.log("Time slot deleted:", deletedTimeSlot);
         return { message: "Time slot deleted", status: true }

      } catch (error) {
         console.log(error)
         throw error
      }
   }


   async getReservationDetails(bookingId: string): Promise<{ message: string; reservationDatas: object | null; }> {
      try {
         const reservationDatas = await bookingModel.findOne({ bookingId })
            .populate('userId', 'username email')
            .populate('tableId', 'tableNumber tableCapacity tableLocation')
         console.log(reservationDatas)
         if (!reservationDatas) {
            return { message: "Error while fetching reservation datas", reservationDatas: null }
         }
         return { reservationDatas, message: "" }
      } catch (error) {
         console.log(error)
         throw error
      }
   }

   async updateBookingStatus(bookingId: string, bookingStatus: string): Promise<{ message: string; status: boolean; }> {
      try {

         const bookingData = await bookingModel.findOneAndUpdate(
            { bookingId },
            { $set: { bookingStatus } },
            { new: true })

         if (!bookingData) {
            return { message: "Booking not found", status: false };
         }
         console.log("Updated Booking Data:", bookingData);
         return { message: "Booking status updated", status: true }
      } catch (error) {
         console.log(error)
         throw error
      }
   }


   async dashboardRepo(restaurantId: string, month: number): Promise<{ message: string; status: boolean; totalRevenue: number; totalBookingCount: number; totalBookingPaidCount: number; totalCompletedBookingCount: number; totalConfirmedBookingCount: number, totalPendingBookingCount: number, totalCancelledBookingCount: number, reviewCount: number, dailyRevenue: object }> {

      try {
         const totalBookings = await bookingModel.find({ restaurantId })

         const review = await reviewModel.find({ restaurantId })

         //filter booking status paid
         const bookingPaidFilter = totalBookings.filter(booking => booking.paymentStatus === 'PAID').sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

         //filter booking status completed
         const bookingCompletedFilter = totalBookings.filter(booking => booking.bookingStatus === 'COMPLETED')

         const bookingConfirmedFitler = totalBookings.filter(booking => booking.bookingStatus === 'CONFIRMED')

         const bookingPendingFilter = totalBookings.filter(booking => booking.bookingStatus === "PENDING")

         const bookingCancelledFilter = totalBookings.filter(booking => booking.bookingStatus === "CANCELLED")


         const obj: any = {}
         for (const val of bookingPaidFilter) {
            const key = val.createdAt.toString().split(" ")
            const monthOfData = new Date(val.createdAt).getMonth() + 1;
            if (monthOfData === month) {
               if (obj[key[2]] !== undefined) {
                  obj[key[2]] += val.totalAmount
               } else {
                  obj[key[2]] = val.totalAmount
               }
            }
         }
         const dailyRevenue = {
            key: Object.keys(obj),
            values: Object.values(obj)
         }

         // total revenue of status paid
         const totalRevenue = bookingPaidFilter
            .reduce((acc, booking) => acc + booking.totalAmount, 0)
         console.log('totalRevenue:', totalRevenue)


         // total Booking count
         const totalBookingCount = totalBookings.length
         console.log("totalBookingCount:", totalBookingCount)

         //total booking paid status count
         const totalBookingPaidCount = bookingPaidFilter.length
         console.log('totalPaidBookingCount:', totalBookingPaidCount)

         //total completed booking status count
         const totalCompletedBookingCount = bookingCompletedFilter.length
         console.log('totalCompletedBookingCount:', totalCompletedBookingCount)


         const totalConfirmedBookingCount = bookingConfirmedFitler.length
         console.log("totalConfirmedBookingCount:", totalConfirmedBookingCount)

         const totalPendingBookingCount = bookingPendingFilter.length
         console.log("totalPendingBookingCount:", totalPendingBookingCount)

         const totalCancelledBookingCount = bookingCancelledFilter.length
         console.log("bookingCancelledFilter:", bookingCancelledFilter)

         const reviewCount = review.length
         console.log("reviewCount:", reviewCount)



         console.log(totalBookings)

         console.log(bookingPaidFilter, dailyRevenue, "this is bab that okay")

         return { message: "dashboard details fetched successfully", status: true, totalRevenue, totalBookingCount, totalBookingPaidCount, totalCompletedBookingCount, totalConfirmedBookingCount, totalPendingBookingCount, totalCancelledBookingCount, reviewCount, dailyRevenue }

      } catch (error) {
         console.log(error)
         throw error
      }
   }



   async downloadReport(restaurantId: string, period: string): Promise<{ message: string, status: boolean, doc?: PDFKit.PDFDocument }> {
      try {
         const restaurantData = await this.getRestaurantData(restaurantId, period);
         console.log(restaurantData);

         if (!restaurantData) {
            return { message: 'No data found for the given period', status: false };
         }

         const doc = new PDFDocument();

         const startDateStr = restaurantData.startDate.toLocaleDateString();
         const endDateStr = restaurantData.endDate.toLocaleDateString();


         doc.fontSize(20).text(`${period} Report - ${restaurantData.restaurantName}`, { align: 'center' });
         doc.moveDown();
         doc.fontSize(12).text(`Time period: ${startDateStr} - ${endDateStr}`, { align: 'center' });
         doc.moveDown();
         doc.text(`Total Revenue: INR ${restaurantData.totalRevenue.toFixed(2)}`);
         doc.moveDown();
         doc.text(`Total Bookings: ${restaurantData.totalBookingCount}`);
         doc.moveDown();
         doc.text(`Completed Bookings: ${restaurantData.totalCompletedBookingCount}`);
         doc.moveDown();
         doc.text(`Confirmed Bookings: ${restaurantData.totalConfirmedBookingCount}`);
         doc.moveDown();
         doc.text(`Cancelled Bookings: ${restaurantData.totalCancelledBookingCount}`);
         doc.moveDown();
         doc.text(`Payment Refunded : ${restaurantData.totalPaymentRefunded}`);
         doc.moveDown();
         doc.text(`Pending Bookings: ${restaurantData.totalPendingBookingCount}`);
         doc.moveDown();
         doc.text(`Total Reviews: ${restaurantData.reviewCount}`);
         doc.moveDown();
         // doc.text(`Booking Details: ${restaurantData.fullBookingDetails}`);
         // doc.moveDown();

         const table = {
            title: "Full Booking Details",
            headers: ["Username", "Email", "Booking ID", "Booking Date", "Booking Time", "Payment Method", "Payment Status", "Booking Status", "Amount", "Cancellation Reason"],
            rows: restaurantData.fullBookingDetails.map((booking: any) => [
               booking.userId.username,
               booking.userId.email,
               booking.bookingId,
               new Date(booking.bookingDate).toLocaleDateString(),
               booking.bookingTime,
               booking.paymentMethod,
               booking.paymentStatus,
               booking.bookingStatus,
               `INR ${booking.totalAmount.toFixed(2)}`,
               booking.cancellationReason || '-',
            ]),
         };

         // Add the table to the PDF
         await doc.table(table, {
            prepareHeader: () => doc.fontSize(6).font('Helvetica-Bold'),
            prepareRow: (row, i) => doc.fontSize(6).font('Helvetica')
         });



         return { message: 'Report generated successfully', status: true, doc }

      } catch (error) {
         console.log(error);
         throw new Error('Error generating the report.');
      }
   }


   private async getRestaurantData(restaurantId: string, period: string) {
      console.log("getRestaurantData pdf download")
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

      // Fetch restaurant details
      const restaurant = await restaurantModel.findById(restaurantId).select('restaurantName');
      if (!restaurant) {
         throw new Error('Restaurant not found');
      }

      // Query the database for bookings within the given period
      const bookings = await bookingModel.find({
         restaurantId: restaurantId,
         createdAt: {
            $gte: startDate,
            $lt: endDate,
         },
      });

      console.log("bookings:", bookings, startDate, endDate)

      const fullBookingDetails = await bookingModel.find({
         restaurantId: restaurantId,
         createdAt: {
            $gte: startDate,
            $lt: endDate,
         },
      })
         .select('-_id userId bookingId bookingDate bookingTime paymentMethod paymentStatus bookingStatus totalAmount cancellationReason ') // Exclude specific fields
         .populate({
            path: 'userId',
            select: 'email username -_id',
         });
      console.log(fullBookingDetails)




      // Calculate the required data
      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      const totalBookingCount = bookings.length;
      const totalCompletedBookingCount = bookings.filter(booking => booking.bookingStatus === 'COMPLETED').length;
      const totalCancelledBookingCount = bookings.filter(booking => booking.bookingStatus === 'CANCELLED').length;
      const totalPaymentRefunded = bookings.filter(booking => booking.paymentStatus === 'REFUNDED').length;
      const totalPendingBookingCount = bookings.filter(booking => booking.bookingStatus === 'PENDING').length;
      const totalConfirmedBookingCount = bookings.filter(booking => booking.bookingStatus === 'CONFIRMED').length;

      const reviewCount = await reviewModel.countDocuments({ restaurantId })

      console.log("PDF DATAS", totalRevenue, totalBookingCount, totalCompletedBookingCount, totalCancelledBookingCount, totalPendingBookingCount, totalConfirmedBookingCount, reviewCount)

      return {
         restaurantName: restaurant.restaurantName,
         fullBookingDetails,
         totalRevenue,
         totalBookingCount,
         totalCompletedBookingCount,
         totalCancelledBookingCount,
         totalPendingBookingCount,
         totalConfirmedBookingCount,
         reviewCount,
         startDate,
         endDate,
         totalPaymentRefunded
      };
   }




}




