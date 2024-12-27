import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("users - UpdateById", () => {

  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/users").send({
      name: "Juca",
      lastname: "silva",
      email: "jucaupdate@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/users/${res1.body.id}`).send({
      name: "Juca",
      lastname: "silva",
      email: "jucaupdates@gmail.com",
    });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/users/99999").send({
      email: "juca@gmail.com",
      name: "Juca",
      lastname: "silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});
