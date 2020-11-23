import Axios, { AxiosError, AxiosResponse } from "axios";

interface ISigninData {
  login: string;
  password: string;
  salt: string;
}
interface ISignupData {
  login: string;
  password: string;
}

class AuthService {
  public signin(data: ISigninData): Promise<{ tokens: App.ITokens }> {
    return Axios.post("/auth/signin", data)
      .then(
        (
          response: AxiosResponse<{
            tokens: { access: string; refresh: string };
          }>
        ) => {
          return response.data;
        }
      )
      .catch((error: AxiosError<{ error: string }>) => {
        // eslint-disable-next-line
        throw error.response?.data.error || "error";
      });
  }
  public signup(data: ISignupData): Promise<{ tokens: App.ITokens }> {
    return Axios.post("/auth/signup", data)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError<{ error: string }>) => {
        // eslint-disable-next-line
        throw error.response?.data.error || "error";
      });
  }
}

export default AuthService;
