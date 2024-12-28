import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("User Classes - Create", () => {

  it("Cria registro", async () => {
    const res1 = await testServer.post("/users").send({
      email: "juca@gmail.com",
      name: "Juca",
      lastname: "silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testServer.get(`/users/${res1.body.id}`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);

    const res2 = await testServer.post("/classes").send({
      title: "Direção Defensiva",
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada2 = await testServer.get(`/classes/${res2.body.id}`).send();
    expect(resBuscada2.statusCode).toEqual(StatusCodes.OK);

    const res3 = await testServer.post("/user_classes").send({
      user_id: res1.body.id,
      class_id: res2.body.id
    });

    expect(res3.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Cria registro 2", async () => {
    const res1 = await testServer.post("/users").send({
      email: "juca2@gmail.com",
      name: "Juca",
      lastname: "silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testServer.get(`/users/${res1.body.id}`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);

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
      class_id: res2.body.id
    });

    expect(res3.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Tenta criar registro sem user_id", async () => {
    const res1 = await testServer.post("/user_classes").send({
      class_id: 1
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem class_id", async () => {
    const res1 = await testServer.post("/user_classes").send({
      user_id: 1
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res1 = await testServer.post("/user_classes").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

});
