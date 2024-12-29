import { AddSaunaRequest } from "../../../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../../../dto/request/update.sauna.request";
import { ErrorFactory } from "../../../errors/error-factory.error";

export const SaunaTypes = {
  finnish: "finnish",
  steam: "steam",
  infrared: "infrared",
  turkish: "turkish",
} as const;
export type SaunaType = keyof typeof SaunaTypes;
export function validateSaunaType(saunaType: string): saunaType is SaunaType{
   return saunaType in SaunaTypes;
}
export function validateAddSauna(data : AddSaunaRequest):void{

    if (data.humidity <= 0 && data.humidity > 100) {
      throw ErrorFactory.createBadRequestError(
        "Sauna humidity must be under 100 and greater than 0",
      );
    }
    if (data.temperature <= 0 && data.temperature >= 200) {
      throw ErrorFactory.createBadRequestError(
        "Sauna temperature must be under 200 and greater than 0",
      );
    }
    if (data.peopleCapacity >= 100 && data.peopleCapacity < 0) {
      throw ErrorFactory.createBadRequestError(
        "People capacity must be under 100 and greater than 0",
      );
    }
    const saunaType = data.saunaType.toLowerCase();
    if (!validateSaunaType(saunaType)) {
      throw ErrorFactory.createBadRequestError(
        `Sauna type can not be: ${saunaType}, possible types are: ${SaunaTypes}`,
      );

  }}

export function validateUpdateSauna(data: UpdateSaunaRequest):void{
    validateAddSauna(data);
}
