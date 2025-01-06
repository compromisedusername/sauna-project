


function validateRegister(surname: string, name: string, password: string, email:string) {
  const errors: string[] = [];

  if (surname.length > 60 || surname.length < 2) {
    errors.push("Name must be between 2 and 60 characters");
  }

  if (name.length > 60 || name.length < 2) {
    errors.push("Name must be between 2 and 60 characters");
  }

  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (email && !emailRegex.test(email)) {
    errors.push("Incorrect email format");
  }

  const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/i;
  if (password && !passwordRegex.test(password)) {
    errors.push("Password must contain minimum one big letter, and one number");
  }

  return errors;
}
export default validateRegister;
