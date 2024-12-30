import { useState, useEffect } from "react";
import fetchData from "../utils/fetch";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

interface Users {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export default function ListUsers() {
  const [data, setData] = useState<Users[]>([]);
  const navigate = useNavigate();

  const getUsers = async (): Promise<void> => {
    try {
      const response = await fetchData(`http://localhost:3333/users`, "GET");
      setData(response || []);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  const getClassByUser = async (id: string): Promise<void> => {
    try {
      const response = await fetchData(
        `http://localhost:3333/user_classes/user/${id}`,
        "GET"
      );
      navigate("/user_classes", { state: response });
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = () => {
    navigate("/user");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-wrap w-full h-full my-12 justify-between">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="flex gap-4 items-baseline">
          <h1 className="text-2xl font-bold mb-6">Alunos</h1>
          <Button className="btn" label="Novo" onClick={createUser} />
        </div>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Aulas</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, lastname, name, email }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{lastname}</td>
                  <td>{email}</td>
                  <th>
                    <Button
                      className="btn btn-ghost btn-xs"
                      label="Ver aulas"
                      onClick={() => getClassByUser(id)}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
