import { NextFunction, Request, Response } from "express";
import Controller from "./controller";
import { TravelExprerience } from "../@types/trExperience.t";
import { trExperienceValidation } from "../validations/experience.schema";
import axios from "axios";
import { reverseGeoCode } from "../utils/reverseGeoCode";
import exprerienceModel from "../models/trExperience";
import shedule from "node-schedule";
import { NotificationsType } from "../@types/notifs.t";
import NotificationService from "../services/notificationServices";
import { ObjectId } from "mongoose";
class TravelExperience extends Controller {
  private notificationSevice: NotificationService;
  constructor() {
    super();
    this.notificationSevice = new NotificationService();
  }

  async addExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { body, category, location, plan, publishTime, title, address } =
        req.body as TravelExprerience;
      const user = req.user;
      await trExperienceValidation.validateAsync({
        title,
        body,
        category,
        address,
        plan,
      });

      // auto reverse location to real address
      let finalAddress = address;
      if (
        !finalAddress &&
        location &&
        Array.isArray(location) &&
        location.length === 2
      ) {
        const [longitude, latitude] = location;
        const geoCodeAddress = await reverseGeoCode(latitude, longitude);
        if (geoCodeAddress) {
          finalAddress = geoCodeAddress;
        }
      }

      //   publised on specific date ?

      if (publishTime) {
        shedule.scheduleJob(new Date(publishTime), async () => {
          await exprerienceModel.create({
            title,
            body,
            category,
            plan,
            publishTime: new Date(publishTime),
            location,
            address: finalAddress,
          });

          await this.notificationSevice.createNotification({
            title: "تجربه سفر در صف انتشار قرار گرفت",
            body: `تجربه سفر شما در صف انتشار قرار گرفت و در تاریخ ${new Date(
              publishTime
            ).toLocaleDateString("fa-IR")} منتشر خواهد شد`,
            refer: user._id as unknown as ObjectId,
            user: user._id as unknown as ObjectId,
            referType: "experience",
          });

          return res.status(201).json({
            message: `تجربه کاربری  شما با موفقیت در صف انتشار قرار گرفت`,
            status: 201,
          });
        });
      } else {
        await exprerienceModel.create({
          title,
          body,
          category,
          plan,
          publishTime: new Date(),
          location,
          address: finalAddress,
        });
        await this.notificationSevice.createNotification({
          title: "موفقیت آمیز",
          body: `تجربه سفر شما با موفقیت منتشر شد`,
          refer: user._id as unknown as ObjectId,
          user: user._id as unknown as ObjectId,
          referType: "experience",
        });
        return res
          .status(201)
          .json({ message: `تجربه سفر شما ما موفقیت منتشر شد`, status: 201 });
      }
    } catch (error) {
      next(error);
    }
  }

  
  async ExperienceHandler(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getExperiences(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getExperiencesByQueries(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getUserExperience(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeExperiences(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

const experienceCotroller = new TravelExperience();

export default experienceCotroller;
