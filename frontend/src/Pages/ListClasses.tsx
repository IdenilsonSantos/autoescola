import { useState, useEffect } from "react";
import fetchData from "../utils/fetch";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import UserModal from "../components/UserModal";
import { Bounce, toast } from "react-toastify";

interface Classes {
  id: string;
  title: string;
  day: string;
  hour: string;
}

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export default function ListClasses() {
  const [data, setData] = useState<Classes[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [classId, setClassId] = useState("");
  const navigate = useNavigate();

  const getClasses = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await fetchData(
        `http://localhost:3333/classes`,
        "GET"
      );
      setData(response || []);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  const getUsers = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await fetchData(
        `http://localhost:3333/users`,
        "GET"
      );
      setUsers(response || []);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  const createClass = () => {
    navigate("/class");
  };

  useEffect(() => {
    getClasses();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalSubmit = async (selectedUsers: User[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await fetchData(
        `http://localhost:3333/user_classes_many`,
        "POST",
        selectedUsers.map(({ id }) => ({ user_id: id, class_id: classId }))
      );

      if (response.created.length > 0) {
        toast.success("Sucesso ao anexar aulas aos usuários", {
          transition: Bounce,
        });
      }

      toast.error("Erro ao linkar aulas aos usuários, tente novamente", {
        transition: Bounce,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao linkar aulas aos usuários, tente novamente", {
        transition: Bounce,
      });
    }
  };

  const handleUsers = (classId: string) => {
    getUsers();
    setModalOpen(true);
    setClassId(classId);
  };

  return (
    <>
      <div className="flex flex-wrap w-full h-full my-12 justify-between">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex gap-4 items-baseline">
            <h1 className="text-2xl font-bold mb-6">Aulas</h1>
            <Button className="btn" label="Nova" onClick={createClass} />
          </div>
          <div className="overflow-x-auto max-h-[400px]">
            <table className="table min-w-full">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Dia</th>
                  <th>Horário</th>
                  <th>Adicionar Alunos</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ id, day, title, hour }) => (
                  <tr key={id}>
                    <td>{title}</td>
                    <td>{day}</td>
                    <td>{hour}</td>
                    <th>
                      <Button
                        className="btn btn-ghost btn-xs"
                        label="Adicionar"
                        onClick={() => handleUsers(id)}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}
