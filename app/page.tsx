"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface taskType {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [text, setText] = useState("");
  const [text_field, set_show_field] = useState(false);
  const [confirm, set_confirm] = useState(false)
  function addTask(text: string) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText("");
    set_show_field(false);
  }

  function deleteTask(id:number) {
    setTasks(tasks.filter(task => task.id !== id));
    }

  const handleClickOpenTextField = () => {
    set_show_field(true);
  };

  const handleClickCloseTextField = () => {
    set_show_field(false);
  };

  const handleClickDelete = () => {
    set_confirm(true);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-8">
      <div className="flex justify-center border-b-2 border-red-300">
        <h1 className="">TODO-LIST</h1>
      </div>
      <div className="w-1/3 h-1/3 p-3 flex-col">
        <div className="flex justify-between pb-3">
          <div className="">
            <button
              className="border-2 bg-green-200 border-green-500 rounded-lg p-2 hover:border-green-800 hover:scale-125 active:bg-green-300 transition delay-150 duration-300 ease-in-out"
              onClick={handleClickOpenTextField}
            >
              Add task
            </button>
            <Dialog
              open={text_field}
              onClose={handleClickCloseTextField}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"รายการที่ต้องการบันทึก"}
              </DialogTitle>
              <DialogContent>
                <Box
                  component="form"
                  sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button className="bg-red-500 text-white" onClick={handleClickCloseTextField}>Disagree</Button>
                <Button
                  className="bg-green-500 text-white"
                  onClick={() => {
                    addTask(text);
                  }}
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {/* <div className="">
            <button className="border-4 bg-blue-200 border-blue-500 rounded-lg p-2 hover:border-blue-800 active:bg-blue-300">
              TEST
            </button>
          </div> */}
        </div>
        <div className="flex justify-center items-center p-2 border-2 border-gray-600 rounded-xl bg-slate-200">
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              height: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {tasks.map((item, index) => (
              <li key={`section-${index}`}>
                <ul>
                  <ListItem key={index}>
                    <ListItemText primary={item.text} />
                    <IconButton aria-label="delete" onClick={()=> deleteTask(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Dialog
              open={confirm}
              onClose={handleClickDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
              </DialogTitle>
              <DialogContent>
              <Button onClick={()=>set_confirm(false)}>Disagree</Button>
                <Button
                  onClick={() => {
                    addTask(text);
                  }}
                  className="bg-green-500"
                >
                  Agree
                </Button>
              </DialogContent>
            </Dialog>
                  <Divider />
                </ul>
              </li>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
