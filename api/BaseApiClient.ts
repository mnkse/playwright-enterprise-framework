import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { Logger } from "../utils/Logger";

export class BaseApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: string,
  ) {}

  protected async get(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.sendRequest("GET", endpoint, undefined, headers);
  }

  protected async post<T>(
    endpoint: string,
    data?: T,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.sendRequest("POST", endpoint, data, headers);
  }

  protected async put<T>(
    endpoint: string,
    data?: T,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.sendRequest("PUT", endpoint, data, headers);
  }

  protected async delete(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.sendRequest("DELETE", endpoint, undefined, headers);
  }

  protected async assertStatus(
    response: APIResponse,
    expectedStatus: number,
  ): Promise<void> {
    Logger.info("Validating API response status", {
      expectedStatus,
      actualStatus: response.status(),
      url: response.url(),
    });

    expect(response.status()).toBe(expectedStatus);
  }

  protected async parseResponse<T>(response: APIResponse): Promise<T> {
    const responseBody = (await response.json()) as T;

    Logger.debug("API response body parsed", responseBody);

    return responseBody;
  }

  private async sendRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    data?: T,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);

    Logger.info("API request started", {
      method,
      url,
      headers,
      requestBody: data,
    });

    let response: APIResponse;

    switch (method) {
      case "GET":
        response = await this.request.get(url, { headers });
        break;

      case "POST":
        response = await this.request.post(url, {
          data,
          headers,
        });
        break;

      case "PUT":
        response = await this.request.put(url, {
          data,
          headers,
        });
        break;

      case "DELETE":
        response = await this.request.delete(url, { headers });
        break;
    }

    Logger.info("API response received", {
      method,
      url,
      status: response.status(),
      statusText: response.statusText(),
    });

    return response;
  }

  private buildUrl(endpoint: string): string {
    const normalizedBaseUrl = this.baseUrl.replace(/\/$/, "");
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    return `${normalizedBaseUrl}${normalizedEndpoint}`;
  }
}
