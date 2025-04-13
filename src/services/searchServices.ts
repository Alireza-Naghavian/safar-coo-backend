import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

export default class SearchServices {
  public async generalSearch() {}
  public async partialSearch<T>(
    req: Request,
    res: Response,
    next: NextFunction,
    model: Model<T>
  ): Promise<{ searchResult: T[] | null; search: string }> {
    try {
      const search = (req.query.search as string) ?? "";

      if (!search) {
        return { searchResult: null, search };
      }

      const searchResult = await model.find({
        $text: { $search: search },
      });

      return { searchResult, search };
    } catch (error) {
      next(error);
      return { searchResult: null, search: "" };
    }
  }
}
