import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import { Checkbox } from "@mui/material";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import api from "../axios/api";
import { toast, ToastContainer } from "react-toastify";
function Task(props) {
  // const task = props.task;
  const [task, setTask] = useState({ ...props.task });
  const [isOpen, setIsOpen] = useState(false);

  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    handleCompleted();
    toast.success("Task Completed Successfully!");
  };

  const handleCompleted = async () => {
    const updatedTask = { ...task, status: true };
    setTask(updatedTask);
    await api.put(`user/editTask/${task._id}`, updatedTask);
    console.log("Completing task:", updatedTask);
    props.viewPendingTasks();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    const updatedTask = { ...task, softDelete: true };
    setTask(updatedTask);
    await api.put(`user/editTask/${task._id}`, updatedTask);
    console.log("Deleting task:", updatedTask);
    if (props.active === "pending") props.viewPendingTasks();
    else if (props.active === "completed") props.viewCompletedTasks();
  };

  // useEffect(() => {
  // props.viewPendingTasks();
  // }, [props.task]);

  const handleSubmit = async () => {
    await api
      .put(`user/editTask/${task._id}`, task)
      .then((response) => {
        console.log("Task updated successfully:", response.data);
        setIsOpen(false);
        toast.success("Task Updated Successfully!");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  let taskDescription;

  if (props.active === "pending") {
    taskDescription = (
      <p className="text-gray-700 ml-[25px] mb-[5px] text-[14px]">
        {task.taskDescription ? task.taskDescription : ""}
      </p>
    );
  } else if (props.active === "completed") {
    taskDescription = (
      <p className="text-gray-700 ml-[10px] mb-[5px] text-[14px]">
        {task.taskDescription}
      </p>
    );
  } else if (props.active === "deleted") {
    taskDescription = (
      <p className="text-gray-700 ml-[10px] mb-[5px] text-[14px]">
        {task.taskDescription}
      </p>
    );
  }
  return (
    <div>
      <div className="bg-white px-4 my-2 rounded-lg shadow-md border border-emerald-200 pb-2.5 ">
        <section className="flex items-center justify-between pt-2.5">
          <div className="flex items-center w-[60%]">
            {props.active === "pending" && (
              <Checkbox
                checked={checked}
                onClick={handleCheck}
                className="w-0"
              />
            )}
            <h2 className="text-lg font-semibold text-emerald-900 ml-2.5 ">
              {task.taskName}
            </h2>
          </div>
          <div className="text-gray-500 text-sm  flex items-center gap-2 ">
            {/* <p className="">
              {new Date(task.createdTime).toLocaleDateString()}{" "}
            </p> */}
            {props.active === "pending" && (
              <img
                src={editIcon}
                alt="edit"
                className="w-5 h-5 md:mx-2 hover:cursor-pointer hover:invert "
                onClick={() => setIsOpen(true)}
              />
            )}
            {props.active !== "deleted" && (
              <img
                src={deleteIcon}
                alt="edit"
                className="w-5 h-5 md:mx-2 hover:cursor-pointer hover:invert "
                onClick={handleDelete}
              />
            )}
            <p className="text-[14px] px-1 border border-gray-300 rounded-md bg-green-100">
              {format(parseISO(task.createdTime), "HH:mm")}
            </p>
          </div>
        </section>
        {taskDescription}
        {isOpen && (
          <div className="z-2 fixed inset-0   bg-opacity-20 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[500px]">
              <h2 className="text-2xl font-bold text-emerald-900 mb-4">
                Edit Task
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Task Name
                </label>
                <input
                  name="taskName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                  defaultValue={task.taskName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="taskDescription"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500 h-32"
                  defaultValue={task.taskDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
