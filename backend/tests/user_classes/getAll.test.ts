import { StatusCodes } from "http-status-codes";
import { describe, expect, it, test } from "@jest/globals";

import { testServer } from "../jest.setup";

describe("User Classes - GetAll", () => {
  it("Busca registros", async () => {
    const resBuscada = await testServer.get(`/user_classes`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThanOrEqual(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThanOrEqual(0);
  });
});
