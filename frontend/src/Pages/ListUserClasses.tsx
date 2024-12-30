import { useLocation } from "react-router-dom";
import SelectInputField from "../components/Select";
import { useState } from "react";
import fetchData from "../utils/fetch";

export default function ListUserClasses() {
  const location = useLocation();
  const [statusValues, setStatusValues] = useState<Record<number, number>>({});
  const { state } = location;

  const selectOptions = [
    { value: 0, label: "Em andamento" },
    { value: 1, label: "Concluída" },
  ];

  const userId = state[0].user_id;

  const updateStatusInBackend = async (classId: number, newStatus: number) => {
    try {
      const response = await fetchData<Record<string, unknown>>(
        `http://localhost:3333/user_classes/user/${userId}/class/${classId}`,
        "PUT",
        {
          status: newStatus === 0 ? false : true,
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Erro ao atualizar o status", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    classId: number
  ) => {
    const { value } = e.target;
    const newStatus = parseInt(value);

    setStatusValues((prev) => ({
      ...prev,
      [classId]: newStatus,
    }));

    updateStatusInBackend(classId, newStatus);
  };

  if (!state || !Array.isArray(state)) {
    return <div>Sem informações de aulas disponíveis</div>;
  }

  return (
    <div className="flex flex-wrap w-full h-full my-12 justify-between">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">
          Aulas do(a) Aluno(a) {state[0].user_name} {state[0].user_lastname}
        </h1>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th>Título</th>
                <th>Hora</th>
                <th>Dia</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {state.map(
                ({ id, class_name, class_hour, class_day, status }) => {
                  const currentStatus = statusValues[id] ?? status;

                  return (
                    <tr key={id}>
                      <td>{class_name}</td>
                      <td>{class_hour}</td>
                      <td>{class_day}</td>
                      <td>
                        <SelectInputField
                          label=""
                          options={selectOptions}
                          value={String(currentStatus)}
                          onChange={(e) => handleChange(e, id)}
                          name={`status-${id}`}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
