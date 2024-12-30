
import { Request, Response } from "express";
import { ResponseFactory } from "../dto/response/response-factory.response";
import { ErrorFactory } from "../errors/error-factory.error";
import { SaunaService } from "../services/sauna.service";
import { SaunaResponse } from "../dto/response/sauna.response.dto";
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";
import { RoleService } from "../services/role.service";

export class RoleController {
  private readonly roleSerivce: RoleService;

  constructor() {
    this.roleSerivce = new RoleService();
  }

  public async getAllSaunas(req: Request, res: Response): Promise<Response> {
    try {
      const saunas: SaunaResponse[] = await this.roleSerivce.getAllSaunas();
      return ResponseFactory.ok(res, saunas);
    } catch (error) {
      return ResponseFactory.error(res, 500, "Error fetching saunas");
    }
  }

  public async getSauna(req: Request, res: Response): Promise<Response> {
      const saunaId: number = Number(req.params.id);
      const sauna: SaunaResponse = await this.roleSerivce.getSauna(saunaId);
      return ResponseFactory.ok(res, sauna);
  }

  public async addSauna(req: Request, res: Response): Promise<Response> {
      const saunaData: AddSaunaRequest = req.body;

      if (!saunaData) {
        throw ErrorFactory.createBadRequestError("Invalid sauna data");
      }

      const createdSaunaId: number = await this.roleSerivce.addSauna(saunaData);
      return ResponseFactory.created(res, createdSaunaId);
  }

  public async updateSauna(req: Request, res: Response): Promise<Response> {
      const saunaData: UpdateSaunaRequest = req.body;

      const isUpdated: boolean = await this.roleSerivce.updateSauna(saunaData);
      if (isUpdated) {
        return ResponseFactory.updated(res, "Sauna");
      } else {
        throw ErrorFactory.createNotFoundError("Sauna not found");
      }

  }

  public async deleteSauna(req: Request, res: Response): Promise<Response> {
      const saunaId: number = Number(req.params.id);
      const isDeleted: boolean = await this.roleSerivce.deleteSauna(saunaId);

      if (isDeleted) {
        return ResponseFactory.deleted(res, "Sauna");
      } else {
        throw ErrorFactory.createNotFoundError("Sauna not found");
      }
  }
}

