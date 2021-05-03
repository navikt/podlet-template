import { QueryFunctionContext, QueryKey } from "react-query";

function getEnvironment(): "production" | "development" {
  if (process.env.NODE_ENV === "production") {
    return "production";
  }
  return "development";
}

const checkResponse = (response: any) => {
  if (!response.ok) {
    throw new Error("Fetch request failed");
  }
};

export const fetcher = async (queryFunctionContext: QueryFunctionContext) => {
  const response = await fetch(queryFunctionContext.queryKey.toString(), {
    method: "GET",
    credentials: "include",
  });
  checkResponse(response);

  return response.json();
};

type EnvUrl = { development: string; production: string };

const AUTH_URL: EnvUrl = {
  development: "https://api.nav.no/innloggingsstatus/auth",
  production: "https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth",
};

export interface AuthResponse {
  authenticated: boolean;
  name: string;
  securityLevel: "3" | "4";
}

export const authUrl = AUTH_URL[getEnvironment()];
