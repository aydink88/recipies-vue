import { onBeforeUnmount } from "vue";
import { useReducer } from "./reducer";

interface IState {
  error: IError | null;
  usedCalls: string;
}

interface IError {
  response: { status: number };
  needFakeData: boolean;
  message: string;
}

interface Action<T> {
  type: T;
}

interface IClearAction extends Action<"CLEAR"> {}
interface IRequestAction extends Action<"REQUEST"> {}
interface IResponseAction extends Action<"RESPONSE"> {
  usedCalls: string;
}
interface IErrorAction extends Action<"ERROR"> {
  error: IError;
}

type TAction = IClearAction | IRequestAction | IResponseAction | IErrorAction;

const httpReducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case "CLEAR":
    case "REQUEST":
      return { ...state, error: null };
    case "RESPONSE":
      return { ...state, usedCalls: action.usedCalls };
    case "ERROR":
      return { ...state, error: action.error };
    default:
      throw Error("Should not be reached!");
  }
};

export default function useHttpErrorHandler(httpClient: any) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    error: null,
    usedCalls: "0",
  });

  const reqInterceptor = httpClient.interceptors.request.use((req: any) => {
    dispatch({ type: "REQUEST" });
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res: any) => {
      if (res.headers["x-api-quota-used"] > 0) {
        const usedCalls = res.headers["x-api-quota-used"];
        dispatch({ type: "RESPONSE", usedCalls });
      }
      return res;
    },
    (error: IError) => {
      if (error.message.includes("timeout")) {
        error.needFakeData = true;
      } else if (error.response && error.response.status === 402) {
        error.needFakeData = true;
        error.message =
          "Limit of usage API is reached for today. Fake data is displayed now.";
      }
      dispatch({ type: "ERROR", error });
      throw error;
    }
  );

  const errorConfirmedHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  const ejectHttpClient = () => {
    httpClient.interceptors.request.eject(reqInterceptor);
    httpClient.interceptors.response.eject(resInterceptor);
  };

  onBeforeUnmount(() => {
    console.log("http error unmounting");
    httpClient.interceptors.request.eject(reqInterceptor);
    httpClient.interceptors.response.eject(resInterceptor);
  });

  return [
    httpState.error,
    errorConfirmedHandler,
    httpState.usedCalls,
    ejectHttpClient,
  ];
}
