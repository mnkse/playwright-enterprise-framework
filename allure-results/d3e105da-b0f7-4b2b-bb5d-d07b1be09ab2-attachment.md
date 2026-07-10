# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\users.api.spec.ts >> Users API Tests >> should create a user
- Location: tests\api\users.api.spec.ts:44:7

# Error details

```
Error: apiRequestContext.post: getaddrinfo ENOTFOUND test-api.example.com
Call log:
  - → POST https://test-api.example.com/users
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 75

```

# Test source

```ts
  1   | import {
  2   |   APIRequestContext,
  3   |   APIResponse,
  4   |   expect,
  5   | } from '@playwright/test';
  6   | import { Logger } from '../utils/Logger';
  7   | 
  8   | export class BaseApiClient {
  9   |   constructor(
  10  |     protected readonly request: APIRequestContext,
  11  |     protected readonly baseUrl: string,
  12  |   ) {}
  13  | 
  14  |   protected async get(
  15  |     endpoint: string,
  16  |     headers?: Record<string, string>,
  17  |   ): Promise<APIResponse> {
  18  |     return await this.sendRequest('GET', endpoint, undefined, headers);
  19  |   }
  20  | 
  21  |   protected async post<T>(
  22  |     endpoint: string,
  23  |     data?: T,
  24  |     headers?: Record<string, string>,
  25  |   ): Promise<APIResponse> {
  26  |     return await this.sendRequest('POST', endpoint, data, headers);
  27  |   }
  28  | 
  29  |   protected async put<T>(
  30  |     endpoint: string,
  31  |     data?: T,
  32  |     headers?: Record<string, string>,
  33  |   ): Promise<APIResponse> {
  34  |     return await this.sendRequest('PUT', endpoint, data, headers);
  35  |   }
  36  | 
  37  |   protected async delete(
  38  |     endpoint: string,
  39  |     headers?: Record<string, string>,
  40  |   ): Promise<APIResponse> {
  41  |     return await this.sendRequest('DELETE', endpoint, undefined, headers);
  42  |   }
  43  | 
  44  |   protected async assertStatus(
  45  |     response: APIResponse,
  46  |     expectedStatus: number,
  47  |   ): Promise<void> {
  48  |     Logger.info('Validating API response status', {
  49  |       expectedStatus,
  50  |       actualStatus: response.status(),
  51  |       url: response.url(),
  52  |     });
  53  | 
  54  |     expect(response.status()).toBe(expectedStatus);
  55  |   }
  56  | 
  57  |   protected async parseResponse<T>(response: APIResponse): Promise<T> {
  58  |     const responseBody = (await response.json()) as T;
  59  | 
  60  |     Logger.debug('API response body parsed', responseBody);
  61  | 
  62  |     return responseBody;
  63  |   }
  64  | 
  65  |   private async sendRequest<T>(
  66  |     method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  67  |     endpoint: string,
  68  |     data?: T,
  69  |     headers?: Record<string, string>,
  70  |   ): Promise<APIResponse> {
  71  |     const url = this.buildUrl(endpoint);
  72  | 
  73  |     Logger.info('API request started', {
  74  |       method,
  75  |       url,
  76  |       headers,
  77  |       requestBody: data,
  78  |     });
  79  | 
  80  |     let response: APIResponse;
  81  | 
  82  |     switch (method) {
  83  |       case 'GET':
  84  |         response = await this.request.get(url, { headers });
  85  |         break;
  86  | 
  87  |       case 'POST':
> 88  |         response = await this.request.post(url, {
      |                                       ^ Error: apiRequestContext.post: getaddrinfo ENOTFOUND test-api.example.com
  89  |           data,
  90  |           headers,
  91  |         });
  92  |         break;
  93  | 
  94  |       case 'PUT':
  95  |         response = await this.request.put(url, {
  96  |           data,
  97  |           headers,
  98  |         });
  99  |         break;
  100 | 
  101 |       case 'DELETE':
  102 |         response = await this.request.delete(url, { headers });
  103 |         break;
  104 |     }
  105 | 
  106 |     Logger.info('API response received', {
  107 |       method,
  108 |       url,
  109 |       status: response.status(),
  110 |       statusText: response.statusText(),
  111 |     });
  112 | 
  113 |     return response;
  114 |   }
  115 | 
  116 |   private buildUrl(endpoint: string): string {
  117 |     const normalizedBaseUrl = this.baseUrl.replace(/\/$/, '');
  118 |     const normalizedEndpoint = endpoint.startsWith('/')
  119 |       ? endpoint
  120 |       : `/${endpoint}`;
  121 | 
  122 |     return `${normalizedBaseUrl}${normalizedEndpoint}`;
  123 |   }
  124 | }
```