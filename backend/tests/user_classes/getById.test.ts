import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("User Classes - GetById", () => {

  it("Busca registro por id", async () => {
    const res1 = await testServer.post("/users").send({
      email: "juca2@gmail.com",
      name: "Juca",
      lastname: "silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada1 = await testServer.get(`/users/${res1.body.id}`).send();
    expect(resBuscada1.statusCode).toEqual(StatusCodes.OK);

    const res2 = await testServer.post("/classes").send({
      title: "Direção Defensiva 2",
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada2 = await testServer.get(`/classes/${res2.body.id}`).send();
    expect(resBuscada2.statusCode).toEqual(StatusCodes.OK);

    const res3 = await testServer.post("/user_classes").send({
      user_id: res1.body.id,
      class_id: res2.body.id,
      status: false
    });

    expect(res3.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada3 = await testServer.get(`/user_classes/${res3.body.id}`).send();

    console.log("SDSD", resBuscada3.header)
    expect(resBuscada3.statusCode).toEqual(StatusCodes.OK);

    expect(Number(resBuscada3.header["x-total-count"])).toBeGreaterThanOrEqual(0);
    expect(resBuscada3.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada3.body.length).toBeGreaterThanOrEqual(0);

  });

  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer.get("/users/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  
});
