import { AddUserRequest } from "../../../dto/request/add.user.request";
import { UpdateUserRequest } from "../../../dto/request/update.user.request";
import { ErrorFactory } from "../../../errors/error-factory.error";

export function validateAddUser(data: AddUserRequest): void {
  if (data.name && (data.name.length < 3 || data.name.length >= 60)) {
    throw ErrorFactory.createBadRequestError(
      "Name must be longer than 2 characters and shorter than 60 characters",
    );
  }
  if ( (data.surname  && data.name ) && (data.surname.length < 3 || data.name.length >= 60)) {
    throw ErrorFactory.createBadRequestError(
      "Surname must be longer than 2 characters and shorter than 60 characters",
    );
  }

  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (data.email  && !emailRegex.test(data.email)) {
    throw ErrorFactory.createBadRequestError("Incorrect email format.");
  }

}
export function validateUpdateUser(data: UpdateUserRequest): void {
}
