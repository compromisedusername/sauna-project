import { UserRequestAdd, UserRequestUpdate } from "../../models/User";

function validateUser(data: UserRequestAdd | UserRequestUpdate): string[] {
  const errors: string[] = [];

  if (data.name.length > 60 || data.name.length < 2) {
    errors.push("Name must be between 2 and 60 characters");
  }

  if (data.surname.length > 60 || data.surname.length < 2) {
    errors.push("Name must be between 2 and 60 characters");
  }

  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Incorrect email format");
  }

  const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/i;
  if (data.passwordHash && !passwordRegex.test(data.passwordHash)) {
    errors.push("Password must contain minimum one big letter, and one number");
  }

  return errors;
}
export default validateUser;
