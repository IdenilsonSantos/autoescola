import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("Classes - GetById", () => {

  it("Busca registro por id", async () => {
    const res1 = await testServer.post("/classes").send({
      title: "Direção Defensiva",
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/classes/${res1.body.id}`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
  });

  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer.get("/classes/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});
