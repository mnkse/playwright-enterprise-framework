import { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { User } from '../models/User';
import { CreateUserRequest } from '../models/CreateUserRequest';

export class UsersApiClient extends BaseApiClient {
  async getAllUsers(): Promise<APIResponse> {
    return await this.get('/users');
  }

  async getUserById(userId: number): Promise<APIResponse> {
    return await this.get(`/users/${userId}`);
  }

  async createUser(
    userData: CreateUserRequest,
  ): Promise<APIResponse> {
    return await this.post('/users', userData);
  }

  async updateUser(
    userId: number,
    userData: Partial<User>,
  ): Promise<APIResponse> {
    return await this.put(`/users/${userId}`, userData);
  }

  async deleteUser(userId: number): Promise<APIResponse> {
    return await this.delete(`/users/${userId}`);
  }

  async assertResponseStatus(
    response: APIResponse,
    expectedStatus: number,
  ): Promise<void> {
    await this.assertStatus(response, expectedStatus);
  }

  async getResponseBody<T>(response: APIResponse): Promise<T> {
    return await this.parseResponse<T>(response);
  }
}