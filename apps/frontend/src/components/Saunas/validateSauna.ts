
import { SaunaRequestAdd } from "../../models/Sauna";
import { SaunaRequestUpdate } from "../../models/Sauna";
const SaunaTypes = {
    finnish: "finnish",
    steam: "steam",
    infrared: "infrared",
    turkish: "turkish",
  } as const;
  type SaunaType = keyof typeof SaunaTypes;

  function validateSaunaType(saunaType: string): saunaType is SaunaType {
    return saunaType in SaunaTypes;
  }

    function validateNwSauna(data: SaunaRequestAdd | SaunaRequestUpdate): string[] {
        const errors: string[] = [];
        if (!data) return errors
        if (data.name && data.name.length >= 50) {
            errors.push("Sauna name can't exceed 50 characters")
        }

        if (data.humidity && (data.humidity <= 0 || data.humidity > 100)) {
            errors.push("Sauna humidity must be between 0 and 100")
        }
        if (data.temperature && (data.temperature <= 0 || data.temperature >= 200)) {
            errors.push("Sauna temperature must be between 0 and 200")
        }
        if ( data.peopleCapacity && (data.peopleCapacity >= 100 || data.peopleCapacity <= 0)) {
            errors.push("People capacity must be between 0 and 100")
        }
        const saunaType = data.saunaType.toLowerCase();
        if (!validateSaunaType(saunaType)) {
            errors.push(`Sauna type can not be: ${saunaType}, possible types are: ${Object.values(SaunaTypes).join(", ")}`)
        }
        return errors;
    }

export default validateNwSauna;
