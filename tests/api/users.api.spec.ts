import { test, expect } from "@playwright/test";
import { UsersApiClient } from "../../api/UsersApiClient";
import { User } from "../../models/User";
import { CreateUserRequest } from "../../models/CreateUserRequest";
import { apiConfig } from "../../configs/api.config";

test.describe("Users API Tests", () => {
  test("should get all users", async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, apiConfig.baseUrl);

    const response = await usersApiClient.getAllUsers();

    await usersApiClient.assertResponseStatus(response, 200);

    const users = await usersApiClient.getResponseBody<User[]>(response);

    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toBeDefined();
    expect(users[0].email).toContain("@");
  });

  test("should get user by id", async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, apiConfig.baseUrl);

    const response = await usersApiClient.getUserById(1);

    await usersApiClient.assertResponseStatus(response, 200);

    const user = await usersApiClient.getResponseBody<User>(response);

    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toContain("@");
  });

  test("should create a user", async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, apiConfig.baseUrl);

    const newUser: CreateUserRequest = {
      name: "Menekse Erhan",
      username: "menekse",
      email: "menekse@example.com",
    };

    const response = await usersApiClient.createUser(newUser);

    await usersApiClient.assertResponseStatus(response, 201);

    const createdUser = await usersApiClient.getResponseBody<User>(response);

    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.id).toBeDefined();
  });

  test("should update a user", async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, apiConfig.baseUrl);

    const updateData: Partial<User> = {
      name: "Updated User",
      email: "updated@example.com",
    };

    const response = await usersApiClient.updateUser(1, updateData);

    await usersApiClient.assertResponseStatus(response, 200);

    const updatedUser = await usersApiClient.getResponseBody<User>(response);

    expect(updatedUser.id).toBe(1);
    expect(updatedUser.name).toBe(updateData.name);
    expect(updatedUser.email).toBe(updateData.email);
  });

  test("should delete a user", async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, apiConfig.baseUrl);

    const response = await usersApiClient.deleteUser(1);

    await usersApiClient.assertResponseStatus(response, 200);
  });

  test("should return 404 for non-existing user", async ({ request }) => {
    const usersApiClient = new UsersApiClient(request, apiConfig.baseUrl);

    const response = await usersApiClient.getUserById(999999);

    await usersApiClient.assertResponseStatus(response, 404);
  });
});
