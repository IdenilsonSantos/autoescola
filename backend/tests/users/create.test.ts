import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from '@jest/globals';

import { testServer } from "../jest.setup";

describe("users - Create", () => {

  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/users")
      .send({
        email: "juca@gmail.com",
        name: "Juca",
        lastname: "silva"
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Cria registro 2", async () => {
    const res1 = await testServer
      .post("/users")
      .send({
        email: "juca2@gmail.com",
        name: "Juca",
        lastname: "silva"
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Tenta criar registro com email duplicado", async () => {
    const res1 = await testServer
      .post("/users")
      .send({
        email: "juca2@gmail.com",
        name: "Juca",
        lastname: "silva"
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem name", async () => {
    const res1 = await testServer
      .post("/users")
      .send({
        email: "juca@gmail.com",
        lastname: "silva"
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem email", async () => {
    const res1 = await testServer
      .post("/users")
      .send({
        name: "Juca",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res1 = await testServer
      .post("/users")
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
  
});
