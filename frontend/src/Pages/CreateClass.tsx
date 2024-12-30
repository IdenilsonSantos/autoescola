import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/Input";
import fetchData from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

interface ClassValues {
  title: string;
  day: string;
  hour: string;
}

function CreateClass() {
  const [values, setValues] = useState<ClassValues>({
    title: "",
    day: "",
    hour: "",
  });

  const [errors, setErrors] = useState<Partial<ClassValues>>({});
  const navigate = useNavigate();

  const validateFields = (): boolean => {
    const newErrors: Partial<ClassValues> = {};
    if (!values.hour) newErrors.hour = "Horário obrigatório";
    if (!values.title) newErrors.title = "Nome obrigatório";
    if (!values.day) newErrors.day = "Sobrenome obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof ClassValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    };

  const save = async (): Promise<void> => {
    if (!validateFields()) return;

    try {
      const response = await fetchData<Record<string, unknown>>(
        "http://localhost:3333/classes",
        "POST",
        values
      );

      if(response){
        navigate("/classes");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Erro ao criar aula, tente novamente", {
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex h-[600px] container my-28">
      <div className="w-1/2 flex items-center justify-center">
        <div className="relative w-[600px] h-[400px] flex items-center justify-center">
          <img
            src="https://plus.unsplash.com/premium_vector-1682300615214-27626e2042dc?q=80&w=2396&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Aplicativo de autoescola"
            className="rounded shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="w-1/2 p-2 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Aula</h1>
        <InputField
          label="Digite o titulo da aula"
          value={values.title}
          onChange={handleChange("title")}
          errorMessage={errors.title}
        />
        <InputField
          label="Digite o dia da aula"
          value={values.day}
          onChange={handleChange("day")}
          errorMessage={errors.day}
          type="date"
        />
        <InputField
          label="Digite o horário da aula"
          value={values.hour}
          onChange={handleChange("hour")}
          errorMessage={errors.hour}
          type="time"
        />
        <div className="mt-4">
          <Button onClick={save} label="Cadastrar aula" />
        </div>
      </div>
    </div>
  );
}

export default CreateClass;
