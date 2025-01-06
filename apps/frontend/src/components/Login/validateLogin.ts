function validateLogin(email?: string, password?: string): string[]{
  const errors : string[] = [];
 if(!email){
   errors.push("Provide email. ")
  }

 if(!password){
   errors.push("Provide password. ")
  }
  return errors;
}
export default validateLogin;
