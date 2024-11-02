import {
  AppBar,
  Container,
  Stack,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/features";

const App = () => {
  const [todos, setTodos] = useState<TodoListType[]>(getTodos());
  const [title, setTitle] = useState<TodoListType["title"]>("");

  const submitHandler = (): void => {
    const newTodo: TodoListType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000)
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  const completeHandler = (id: TodoListType["id"]): void => {
    const newTodos: TodoListType[] = todos.map((i) => {
      if (i.id === id) {
        return { ...i, isCompleted: !i.isCompleted };
      }
      return i;
    });
    setTodos(newTodos);
  };

  const deleteHandler = (id: TodoListType["id"]): void => {
    const newTodos: TodoListType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (id: TodoListType["id"], newTitle: TodoListType["title"]): void => {
    const newTodos: TodoListType[] = todos.map((i) => {
      if (i.id === id) {
        return { ...i, title: newTitle };
      }
      return i;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Calculate total and completed tasks
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.isCompleted).length;

  return (
    <Container sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Typography sx={{ marginRight: 2 }}>
            Total Tasks: {totalTasks} | Completed: {completedTasks}
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"75%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((elem) => (
          <TodoList
            key={elem.id}
            todo={elem}
            editHandler={editHandler}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </Stack>
      <Stack direction={"row"} spacing={1} p={"1rem"}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && title !== "") {
              submitHandler();
            }
          }}
          fullWidth
          label={"Add Task"}
        />
        <Button
          onClick={submitHandler}
          variant="contained"
          disabled={title === ""}
          sx={{ textTransform: "none" }}
        >
          Add
          <AddIcon />
        </Button>
      </Stack>
    </Container>
  );
};

export default App;
