import axios from "axios";

const baseUrl = "https://todo-backend-065g.onrender.com";

const getAllTodo = async (setTodo) => {
  try {
    const response = await axios.get(baseUrl);
    console.log("Fetched Todos:", response.data);
    setTodo(response.data);
  } catch (error) {
    console.error(
      "Error fetching todos:",
      error.response?.data || error.message
    );
  }
};

const addToDo = async (text, setText, setToDo) => {
  if (!text.trim()) {
    console.warn("Todo text cannot be empty.");
    return;
  }

  try {
    const response = await axios.post(`${baseUrl}/save`, { text });
    console.log("Todo added successfully:", response.data);

    setText(""); // Clear input field
    getAllTodo(setToDo); // Refresh todo list
  } catch (error) {
    console.error("Error adding todo:", error.response?.data || error.message);
  }
};

const updateToDo = async (text, setText, setToDo, toDoId, setIsUpdating) => {
  try {
    const response = await axios.post(`${baseUrl}/update`, {
      _id: toDoId,
      text,
    });

    if (response.status === 200) {
      setText("");
      setIsUpdating(false);
      getAllTodo(setToDo); // Refresh todos after update
    } else {
      console.error("Failed to update todo");
    }
  } catch (error) {
    console.error("Update error:", error);
    alert("Failed to update todo. Please try again.");
  }
};

const deleteToDo = (_id, setToDo) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then((response) => {
      console.log("Delete API call successful", response);
      getAllTodo(setToDo);
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
    });
};

export { getAllTodo, addToDo, updateToDo, deleteToDo };
