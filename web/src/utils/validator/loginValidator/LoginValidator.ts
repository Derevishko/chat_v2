import Validator from "../Validator";

class LoginValidator extends Validator<string> {
  protected value: string;
  constructor(login: string) {
    super();
    this.value = login;
  }

  private static regexp = /^\S{3,32}$/;

  public update(value: string) {
    this.value = value;
  }

  public check(): boolean {
    const resultRegexp = !!this.value.match(LoginValidator.regexp);
    return resultRegexp;
  }
}
export default LoginValidator;
