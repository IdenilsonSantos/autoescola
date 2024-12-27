import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("Classes - UpdateById", () => {

  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/classes").send({
      title: "Direção Defensiva",
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/classes/${res1.body.id}`).send({
      title: "Direção Defensiva 2",
      day: "2024-27-14",
      hour: "18:30",
    });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/classes/99999").send({
      email: "juca@gmail.com",
      name: "Juca",
      lastname: "silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});
