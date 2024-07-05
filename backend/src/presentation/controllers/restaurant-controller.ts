import { Request, Response, NextFunction } from "express";
import { restaurantInteractor } from "../../domain/interfaces/usecases/restaurantInteractor"
// import cloudinary from "../../Config/cloudinaryConfig";
import axios from "axios";

export class restaurantController {
   constructor(private readonly interactor: restaurantInteractor) { }

   async restaurantResgistration(req: Request, res: Response, next: NextFunction) {
      // const { email, } = req.body
      console.log("Req body:", req.body)
      try {

         const { message, restaurant } = await this.interactor.restaurantRegistration(req.body);
         if (!restaurant) {
            return res.status(401).json({ message })
         }
         return res.status(201).json({ message: "Registration successfull" })
      } catch (error) {
         console.error("Error in restaurant registration service", error);
         res.status(500).send({ message: "Internal server error" })
      }
   }

   async restaurantLogin(req: Request, res: Response, next: NextFunction) {
      console.log("inside restaurantlogin controller");
      try {
         const { email, password } = req.body
         const { restaurant, token, message, refreshtoken  } = await this.interactor.restaurantLogin({ email, password })
         if (!restaurant) {
            return res.status(401).json({ message, token: null })
         }
         res.cookie("refreshToken", refreshtoken ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
         });
         return res.status(200).json({ message, restaurant, token })
      } catch (error) {
         console.error("Error during seller login:", error);
         res.status(500).send("Internal server error")
      }

   }




   async restaurant_details (req: Request, res: Response, next: NextFunction){
      console.log("restaurant full Details")
      console.log(req.cookies)
      const _id = req.userId
      try{
         const { restaurant } = await this.interactor.restaurantGetProfileInteractor(_id)
         return res.status(200).json({ restaurantDetails: restaurant})
      } catch(error){
         console.log("Error occured during get restaurant controller",error)
         res.status(500).send("Internal server error") 
      }
   }

   async restaurant_updation(req: Request, res: Response, next: NextFunction) {
      const { datas } = req.body
      console.log("Restaurant updation details req.body ........................")
      console.log(req.body)
      console.log("Restaurant updation details........................")
      console.log(datas)
      try {
         const { message, restaurant } = await this.interactor.restaurantDetailsUpdateInteractor(datas);
         if (!restaurant) {
            return res.status(401).json({ message: "Restaurant Registration failed" })
         }
         return res.status(201).json({ message })
      } catch (error) {
         console.log("Error in restaurant registration service")
         res.status(500).json({ message: "Internal server error" })
      }
   }

   // async uploadImage(req: Request, res: Response, next: NextFunction) {
   //    try {
   //      if (!req.file) {
   //        return res.status(400).json({ message: "No file uploaded" });
   //      }
        
   //      const result = await cloudinary.uploader.upload(req.file.path);
   //      return res.status(200).json({ url: result.secure_url });
   //    } catch (error) {
   //      console.error("Error uploading image to Cloudinary:", error);
   //      res.status(500).json({ message: "Failed to upload image" });
   //    }
   //  }

   // async restaurant_updation(req: Request, res: Response, next: NextFunction) {
   //    const { datas } = req.body;
   //    console.log("Received data:", datas);

   //    try {
   //       // Check if there are image files to upload
   //       const uploadedImages = await Promise.all(
   //          datas.secondaryImages.map(async (image: any) => {
   //             const formData = new FormData();
   //             formData.append('file', image);
   //             formData.append('upload_preset', 'hg75472a');
   //             formData.append('cloud_name', 'sudev99');

   //             const response = await axios.post(
   //                'https://api.cloudinary.com/v1_1/sudev99/image/upload',
   //                formData,
   //                {
   //                   headers: {
   //                      'Content-Type': 'multipart/form-data'
   //                   }
   //                }
   //             );

   //             return response.data.secure_url;
   //          })
   //       );

   //       // Update `datas` with uploaded image URLs
   //       datas.secondaryImages = uploadedImages;

   //       // Update restaurant details
   //       const { message, restaurant } = await this.interactor.restaurantDetailsUpdateInteractor(datas);
   //       if (!restaurant) {
   //          return res.status(401).json({ message: "Restaurant update failed" });
   //       }
   //       return res.status(201).json({ message: "Restaurant details updated successfully" });
   //    } catch (error) {
   //       console.error("Error updating restaurant details:", error);
   //       return res.status(500).json({ message: "Internal server error" });
   //    }
   // }

  



}


