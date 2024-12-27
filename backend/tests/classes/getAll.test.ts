import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("Classes - GetAll", () => {
  it("Busca registros", async () => {
    const res1 = await testServer.post("/classes").send({
      title: "Direção Defensiva",
      day: "2024-27-12",
      hour: "18:30",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/classes").send();

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
