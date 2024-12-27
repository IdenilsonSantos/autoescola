import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("users - DeleteById", () => {

  it("Apaga registro", async () => {
    const res1 = await testServer.post("/users").send({
      email: "jucadelete@gmail.com",
      name: "Juca",
      lastname: "silva"
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/users/${res1.body.id}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/users/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});
