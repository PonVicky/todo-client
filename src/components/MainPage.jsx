import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import api from "../axios/api";
import Task from "./Task";
import { ToastContainer, toast } from "react-toastify";
function MainPage() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [deletedData, setDeletedData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const notify = () => toast("Task Added Successfully!");

  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDescription: "",
  });

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
    console.log(newTask);
  };

  const handleTaskSubmit = async () => {
    try {
      const response = await api.post("user/createTask", newTask);
      viewPendingTasks();
      console.log("Task added successfully:", response.data);
      setValue(0);
      toast.success("Task Added Successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const viewPendingTasks = async () => {
    await api
      .get("user/viewTasks")
      .then((response) => {
        console.log("Tasks fetched: ", response.data);
        setData(response.data.tasks);
      })
      .catch((error) => console.error("Error fetching tasks: ", error));
  };

  const viewCompletedTasks = async () => {
    api
      .get("user/completedTasks")
      .then((response) => {
        console.log("Completed Tasks fetched: ", response.data);
        setCompletedData(response.data.tasks);
      })
      .catch((error) =>
        console.error("Error fetching completed tasks: ", error)
      );
  };

  const viewDeletedTasks = async () => {
    await api
      .get("user/deletedTasks")
      .then((response) => {
        console.log("Deleted Tasks fetched: ", response.data);
        setDeletedData(response.data.tasks);
      })
      .catch((error) => console.error("Error fetching deleted tasks: ", error));
  };

  useEffect(() => {
    api
      .get("user/viewTasks")
      .then((response) => {
        console.log("Tasks fetched: ", response.data);
        setData(response.data.tasks);
      })
      .catch((error) => console.error("Error fetching tasks: ", error));

    api
      .get("user/completedTasks")
      .then((response) => {
        console.log("Completed Tasks fetched: ", response.data);
        setCompletedData(response.data.tasks);
      })
      .catch((error) =>
        console.error("Error fetching completed tasks: ", error)
      );

    api
      .get("user/deletedTasks")
      .then((response) => {
        console.log("Deleted Tasks fetched: ", response.data);
        setDeletedData(response.data.tasks);
      })
      .catch((error) => console.error("Error fetching deleted tasks: ", error));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=" min-h-screen flex  items-center bg-emerald-50 border-8 border-emerald-600 flex-col ">
      <div className="flex flex-row mt-10">
        <input
          type="text"
          name="taskName"
          placeholder="Task"
          className=" border border-emerald-200 bg-white rounded-lg px-4 py-1 mt-10 w-[70%] focus:outline-emerald-500 mr-[10px]"
          onChange={handleTaskInputChange}
        />
        <input
          type="text"
          name="taskDescription"
          placeholder="Task Description"
          className=" border border-emerald-200 bg-white rounded-lg px-4 py-2 mt-10 w-[40%] focus:outline-emerald-500"
          onChange={handleTaskInputChange}
        />
        <button
          className="bg-emerald-600 text-white px-4 py-1 rounded-lg ml-4 mt-10 hover:bg-emerald-700 transition-colors hover:cursor-pointer w-[30%]"
          onClick={handleTaskSubmit}
        >
          Add Task
        </button>
      </div>
      <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
        {/* Tab Headers */}
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Tasks" />
          <Tab label="Completed Tasks" onClick={viewCompletedTasks} />
          <Tab label="Deleted Tasks" onClick={viewDeletedTasks} />
        </Tabs>
        <div className="mx-auto w-[50%]">
          {/* Tab Content */}
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              {data.map((task, index) => (
                <Task
                  key={task._id}
                  task={task}
                  index={index}
                  active={"pending"}
                  viewPendingTasks={viewPendingTasks}
                />
              ))}
            </Box>
          )}
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              {completedData.map((task, index) => (
                <Task
                  key={task._id}
                  task={task}
                  index={index}
                  active={"completed"}
                  viewCompletedTasks={viewCompletedTasks}
                />
              ))}{" "}
            </Box>
          )}
          {value === 2 && (
            <Box sx={{ p: 3 }}>
              {deletedData.map((task, index) => (
                <Task
                  key={task._id}
                  task={task}
                  index={index}
                  active={"deleted"}
                />
              ))}{" "}
            </Box>
          )}
        </div>
      </Box>
    </div>
  );
}

export default MainPage;
