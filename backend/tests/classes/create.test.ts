import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("Classes - Create", () => {

  it("Cria registro", async () => {
    const res1 = await testServer.post("/classes").send({
      title: "Direção Defensiva",
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Cria registro 2", async () => {
    const res1 = await testServer.post("/classes").send({
      title: "Direção Defensiva 2",
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Tenta criar registro com email duplicado", async () => {
    const res1 = await testServer.post("/classes").send({
      title: "Direção Defensiva",
      day: "2024-27-12",
      hour: "18:30",
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem title", async () => {
    const res1 = await testServer.post("/classes").send({
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem data", async () => {
    const res1 = await testServer.post("/classes").send({
      title: "Direção Defensiva",
      hour: "18:30",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem hora", async () => {
    const res1 = await testServer.post("/classes").send({
      day: "2024-27-12",
      title: "Direção Defensiva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res1 = await testServer.post("/classes").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
  
});
