import {
  APIRequestContext,
  APIResponse,
  expect,
} from '@playwright/test';

export class BaseApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: string,
  ) {}

  protected async get(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.request.get(this.buildUrl(endpoint), {
      headers,
    });
  }

  protected async post<T>(
    endpoint: string,
    data?: T,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.request.post(this.buildUrl(endpoint), {
      data,
      headers,
    });
  }

  protected async put<T>(
    endpoint: string,
    data?: T,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.request.put(this.buildUrl(endpoint), {
      data,
      headers,
    });
  }

  protected async delete(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return await this.request.delete(this.buildUrl(endpoint), {
      headers,
    });
  }

  protected async assertStatus(
    response: APIResponse,
    expectedStatus: number,
  ): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  protected async parseResponse<T>(
    response: APIResponse,
  ): Promise<T> {
    return (await response.json()) as T;
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }
}