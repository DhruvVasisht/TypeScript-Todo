import { Checkbox, Paper, Typography, Button, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

type PropsType = {
    todo: TodoListType;
    completeHandler: (id: TodoListType["id"]) => void;
    deleteHandler: (id: TodoListType["id"]) => void;
    editHandler: (id: TodoListType["id"], newTitle: TodoListType["title"]) => void;
};

const TodoList = ({ todo, completeHandler, deleteHandler, editHandler }: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<TodoListType["title"]>(todo.title);


  const handleEditSubmit = () => {
    if (textVal !== "") {
      editHandler(todo.id, textVal);
      setEditActive(false);
    }
  };

  return (
    <div>
      <Paper square={false} sx={{ padding: "1rem" }}>
        <Stack direction={"row"} alignItems={"center"}>
          {editActive ? (
            <TextField
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEditSubmit();
                }
              }}
            />
          ) : (
            <Typography marginRight={"auto"}>{todo.title}</Typography>
          )}

          <Checkbox
            checked={todo.isCompleted}
            onChange={() => completeHandler(todo.id)}
          />
          <Button onClick={() => (editActive ? handleEditSubmit() : setEditActive(true))}>
            {editActive ? "Done" : <EditIcon />}
          </Button>
          <Button onClick={() => deleteHandler(todo.id)} sx={{ color: "black" }}>
            <DeleteIcon />
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

export default TodoList;
