import { NextFunction, Request, Response } from "express";
import { isValidObjectId, ObjectId } from "mongoose";
import shedule from "node-schedule";
import { TravelExprerience, TrExpStatusTypes } from "../@types/trExperience.t";
import exprerienceModel from "../models/trExperience";
import NotificationService from "../services/notificationServices";
import { reverseGeoCode } from "../utils/reverseGeoCode";
import { trExperienceValidation } from "../validations/experience.schema";
import Controller from "./controller";
import SearchServices from "../services/searchServices";
import iranCity from "iran-city"
class TravelExperience extends Controller {
  private notificationSevice: NotificationService;
  private searchSevice: SearchServices;
  constructor() {
    super();
    this.notificationSevice = new NotificationService();
    this.searchSevice = new SearchServices();
  }

  async addExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { body, category, location, plan, publishTime, title, address,province,city } =
        req.body as TravelExprerience;
      const user = req.user;
      await trExperienceValidation.validateAsync({
        title,
        body,
        category,
        plan,
        province,city
      });

      // auto reverse location to real address
      let finalAddress = address;
      if (
        !finalAddress &&
        location &&
        Array.isArray(location) &&
        location.length === 2
      ) {
        const [latitude, longitude] = location;
        const geoCodeAddress = await reverseGeoCode(latitude, longitude);
        if (geoCodeAddress) {
          finalAddress = geoCodeAddress;
        }
      }
      const addExperience = await exprerienceModel.create({
        title,
        body,
        category,
        plan,
        publishTime: publishTime ? new Date(publishTime) : null,
        location,
        address: finalAddress,
        isPublished: !publishTime ? true : false,
        publisher: user._id,
        city,
        province
      });

      // publised on specific date ?
      if (publishTime !== null) {
        shedule.scheduleJob(
          new Date(publishTime).getTime() + 2 * 60 * 1000,
          async () => {
            await exprerienceModel.findOneAndUpdate(
              { _id: addExperience._id },
              { $set: { isPublished: true } }
            );
            await this.notificationSevice.createNotification({
              title: "تجربه سفر شما منتشر شد.",
              body: `مقاله که در صف انتشار قرار گرفته بود،هم‌اکنون منتشر شد`,
              refer: user._id as unknown as ObjectId,
              user: user._id as unknown as ObjectId,
              referType: "experience",
            });
          }
        );
        return res.status(201).json({
          message: `تجربه کاربری  شما با موفقیت در صف انتشار قرار گرفت`,
          status: 201,
        });
      }
      await this.notificationSevice.createNotification({
        title: "ثبت تجربه موفقیت آمیز بود",
        body: `تجربه سفر شما با موفقیت منتشر شد`,
        refer: user._id as unknown as ObjectId,
        user: user._id as unknown as ObjectId,
        referType: "experience",
      });
      return res
        .status(201)
        .json({ message: `تجربه سفر شما ما موفقیت منتشر شد`, status: 201 });
    } catch (error) {
      next(error);
    }
  }

  async ExperienceHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const hasQuey = Object.keys(req.query).length > 0;
      if (hasQuey) {
        return this.getExperiencesByQueries(req, res, next);
      } else {
        return this.getExperiencesPanel(req, res, next);
      }
    } catch (error) {
      next(error);
    }
  }
  async getExperiencesPanel(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user._id;
      const experiences = await exprerienceModel.find(
        { publisher: user },
        "-__v -updatedAt"
      );
      if (!experiences) {
        return res
          .status(404)
          .json({ message: "تجربه‌ای یافت نشد", status: 404 });
      }
      return res.status(200).json(experiences);
    } catch (error) {
      next(error);
    }
  }
  async getExperiencesByQueries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const status = req.query.status as TrExpStatusTypes;
      const user = req.user._id;
     if(req.query.search){
      const {searchResult, search}= await this.searchSevice.partialSearch(req,res,next,exprerienceModel)
      if (!searchResult) {
        return res.status(404).json({
          message: `نتیجه‌ای برای جستجوی ${search} یافت نشد`,
          status: 404,
        });
    }
    return res.status(200).json(searchResult);
  }
      const filterMap: Record<TrExpStatusTypes, object> = {
        published: { publisher: user, isPublished: true },
        queue: { publisher: user, isPublished: false },
        allTrExp: { publisher: user },
      };
      const filter = filterMap[status];
      const experiences = await exprerienceModel.find(filter);
      if (!experiences || experiences.length === 0) {
        return res
          .status(404)
          .json({ message: "تجربه سفر یافت نشد", status: 404 });
      }
      return res.status(200).json(experiences);
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
  async removeExperiences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { expId } = req.params;
      if (!isValidObjectId(expId)) {
        return res
          .status(422)
          .json({ message: "شناسه تجربه سفر معتبر نمیباشد", status: 422 });
      }
      await exprerienceModel.findOneAndDelete({ _id: expId });
      return res
        .status(200)
        .json({ message: "تجربه سفر با موفقیت حذف گردید", status: 200 });
    } catch (error) {
      next(error);
    }
  }
}

const experienceCotroller = new TravelExperience();

export default experienceCotroller;
