import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

interface UserModalProps {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedUsers: User[]) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  users,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectedUsers(isChecked ? users.map((user) => user.id) : []);
  };

  const handleSubmit = () => {
    const selected = users.filter((user) => selectedUsers.includes(user.id));
    onSubmit(selected);
    onClose();
  };

  useEffect(() => {
    setSelectedUsers([]);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h2 className="text-xl font-bold">Selecione Usuários</h2>
            <div className="overflow-x-auto my-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        checked={selectedUsers.length === users.length}
                      />
                    </th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(({ id, name, lastname, email }) => (
                    <tr key={id}>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedUsers.includes(id)}
                          onChange={() => toggleUserSelection(id)}
                        />
                      </td>
                      <td>{name}</td>
                      <td>{lastname}</td>
                      <td>{email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Confirmar
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserModal;
