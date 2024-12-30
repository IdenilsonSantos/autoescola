import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/Input";
import fetchData from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

interface UserValues {
  name: string;
  lastname: string;
  email: string;
}

function CreateUser() {
  const [values, setValues] = useState<UserValues>({
    name: "",
    lastname: "",
    email: "",
  });
  

  const [errors, setErrors] = useState<Partial<UserValues>>({});
  const navigate = useNavigate();

  const validateFields = (): boolean => {
    const newErrors: Partial<UserValues> = {};
    if (!values.email) newErrors.email = "Email obrigatório";
    if (!values.name) newErrors.name = "Nome obrigatório";
    if (!values.lastname) newErrors.lastname = "Sobrenome obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof UserValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await fetchData<Record<string, unknown>>(
        "http://localhost:3333/users",
        "POST",
        values
      );
      setValues({
        name: "",
        lastname: "",
        email: "",
      })

      navigate('/users')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Erro ao criar usuário, tente novamente", {
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
        <h1 className="text-2xl font-bold mb-6">Cadastrar Aluno</h1>
        <InputField
          label="Digite o nome do aluno"
          value={values.name}
          onChange={handleChange("name")}
          errorMessage={errors.name}
        />
        <InputField
          label="Digite o sobrenome do aluno"
          value={values.lastname}
          onChange={handleChange("lastname")}
          errorMessage={errors.lastname}
        />
        <InputField
          label="Digite o email do aluno"
          value={values.email}
          onChange={handleChange("email")}
          errorMessage={errors.email}
        />
        <div className="mt-4">
          <Button onClick={save} label="Cadastrar Aluno" />
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
