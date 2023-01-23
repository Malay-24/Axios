import axios from "axios";
import { useEffect, useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const getData = () => {
    axios
      .get("http://localhost:8080/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = () => {
    const payload = {
      title: text,
      status: false
    };
    axios.post("http://localhost:8080/todos", payload).then(() => getData());
  };
  const handleEdit = (status, id) => {
    axios
      .patch(`http://localhost:8080/todos/${id}`, { status: !status })
      .then((res) => getData());
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/todos/${id}`).then((res) => getData());
  };

  return (
    <div>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Enter todo here.."
        type="text"
      />
      <button onClick={handleAdd}>ADD</button>
      <div>
        {todos.map((el) => (
          <div key={el.id}>
            <input
              checked={el.status}
              type="checkbox"
              onChange={() => handleEdit(el.status, el.id)}
            />
            <h3>{el.title}</h3>
            <p>{el.status ? "DONE" : "NOT DONE"}</p>
            <button onClick={() => handleDelete(el.id)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
};
