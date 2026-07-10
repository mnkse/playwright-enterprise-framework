import { test, expect } from '@playwright/test';
import { UsersApiClient } from '../../api/UsersApiClient';
import { User } from '../../models/User';
import { CreateUserRequest } from '../../models/CreateUserRequest';

test.describe('Users API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  test('should get user by id', async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, baseUrl);

    const response = await usersApiClient.getUserById(1);

    await usersApiClient.assertResponseStatus(response, 200);

    const user = await usersApiClient.getResponseBody<User>(response);

    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toContain('@');
  });

  test('should create a user', async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, baseUrl);

    const newUser: CreateUserRequest = {
      name: 'Menekse Erhan',
      username: 'menekse',
      email: 'menekse@example.com',
    };

    const response = await usersApiClient.createUser(newUser);

    await usersApiClient.assertResponseStatus(response, 201);

    const createdUser =
      await usersApiClient.getResponseBody<User>(response);

    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.id).toBeDefined();
  });
});