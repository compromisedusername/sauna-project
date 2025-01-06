import { RoleRequestAdd } from "../../models/Role";
import { RoleRequestUpdate } from "../../models/Role";
function validateRole(data: RoleRequestAdd | RoleRequestUpdate): string[] {
    const errors: string[] = [];
    if (data.name && data.name.length > 20) {
      errors.push("Role name can't exceed 20 characters");
    }
    if (data.description && data.description.length > 20) {
      errors.push("Role description can't exceed 20 characters");
    }
    return errors;
  }
 export default validateRole;
