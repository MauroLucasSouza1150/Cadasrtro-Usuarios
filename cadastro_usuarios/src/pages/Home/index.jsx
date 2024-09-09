import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import "./style.css";
import { FaTrash } from "react-icons/fa";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input
          type="text"
          name="name"
          placeholder="Digite seu Nome"
          ref={inputName}
        />
        <input
          type="number"
          name="age"
          placeholder="Digite sua Idade"
          ref={inputAge}
        />
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          ref={inputEmail}
        />
        <button onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              <span>Nome:</span> {user.name}
            </p>
            <p>
              <span>idade:</span> {user.age}
            </p>
            <p>
              <span>email:</span> {user.email}
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <FaTrash color="red" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
