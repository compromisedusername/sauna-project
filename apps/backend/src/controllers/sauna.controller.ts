import { Request, Response } from "express";
import { ResponseFactory } from "../dto/response/response-factory.response";
import { ErrorFactory } from "../errors/error-factory.error";
import { SaunaService } from "../services/sauna.service";
import { SaunaResponse, SaunaResponseGuests } from "../dto/response/sauna.response.dto";
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";

export class SaunaController {
  private readonly saunaService: SaunaService;

  constructor() {
    this.saunaService = new SaunaService();
  }

  public async getAllSaunas(req: Request, res: Response): Promise<Response> {
    const saunas: SaunaResponse[] = await this.saunaService.getAllSaunas();
    return ResponseFactory.ok(res, saunas);
  }

  public async getSauna(req: Request, res: Response): Promise<Response> {
    const saunaId: number = Number(req.params.id);
    const sauna: SaunaResponse = await this.saunaService.getSauna(saunaId);
    return ResponseFactory.ok(res, sauna);
  }

  public async addSauna(req: Request, res: Response): Promise<Response> {
    const saunaData: AddSaunaRequest = req.body;

    if (!saunaData) {
      throw ErrorFactory.createBadRequestError("Invalid sauna data");
    }

    const createdSaunaId: number = await this.saunaService.addSauna(saunaData);
    return ResponseFactory.created(res, createdSaunaId);
  }

  public async updateSauna(req: Request, res: Response): Promise<Response> {
    const saunaData: UpdateSaunaRequest = req.body;

    const isUpdated: boolean = await this.saunaService.updateSauna(saunaData);
    if (isUpdated) {
      return ResponseFactory.updated(res, "Sauna");
    } else {
      throw ErrorFactory.createNotFoundError("Sauna not found");
    }
  }

    public async getSaunasForGuests(req: Request, res: Response): Promise<Response> {
    const saunaData: SaunaResponseGuests[] = await this.saunaService.getSaunaForGuests();
    return ResponseFactory.ok(res, saunaData)
  }

  public async getFreeSaunasTimePeriod(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try{
    const dateFrom: Date = new Date(req.body.dateFrom);
    const dateTo: Date = new Date(req.body.dateTo);

    const freeSaunas = await this.saunaService.getFreeSaunasTimePeriod(
      dateFrom,
      dateTo,
    );
    return ResponseFactory.ok(res, freeSaunas);
    }catch(error){
      throw error;
    }

  }

  public async deleteSauna(req: Request, res: Response): Promise<Response> {
    const saunaId: number = Number(req.params.id);
    const isDeleted: boolean = await this.saunaService.deleteSauna(saunaId);

    if (isDeleted) {
      return ResponseFactory.deleted(res, "Sauna");
    } else {
      throw ErrorFactory.createNotFoundError("Sauna not found");
    }
  }
}
