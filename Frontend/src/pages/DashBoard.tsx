import { Button, Col, Input, Row, Typography, DatePicker, Form } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { useTask } from "../contexts/TaskContext";
import { useAuth } from "../contexts/AuthContext";
import TaskFormModal from "../components/TaskFormModal";
import TaskColumn from "../components/TaskColumn";
import EditTaskModal from "../components/EditTaskModal";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import type { Task } from "../contexts/TaskTypes";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const { tasks, updateTask, addTask, deleteTask } = useTask();
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editForm] = Form.useForm();
  const notifiedTaskIds = useRef<Set<string>>(new Set());

  const filteredTasks = tasks.filter((task) => {
    const matchTitle = task.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchDate = dateRange
      ? dayjs(task.dueDate).isSameOrAfter(dateRange[0], "day") &&
        dayjs(task.dueDate).isSameOrBefore(dateRange[1], "day")
      : true;
    return matchTitle && matchDate;
  });

  const groupedTasks = useMemo(() => {
    return {
      "To Do": filteredTasks.filter((t) => t.status === "To Do"),
      "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
      Done: filteredTasks.filter((t) => t.status === "Done"),
    };
  }, [filteredTasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Không thay đổi vị trí
    if (source.droppableId === destination.droppableId) return;

    // Tìm task cần cập nhật
    const movedTask = tasks.find((task) => task._id === draggableId);
    if (movedTask) {
      const updatedTask = { ...movedTask, status: destination.droppableId as "To Do" | "In Progress" | "Done" };
      updateTask(updatedTask);
    }
  };

  const handleCreate = () => {
    form.validateFields().then((values) => {
      addTask({ ...values, status: "To Do" });
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    editForm.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: dayjs(task.dueDate),
    });
    setEditModalVisible(true);
  };

  const handleUpdate = () => {
    editForm.validateFields().then((values) => {
      console.log({ values, editingTask });
      updateTask({ ...editingTask, ...values });
      setEditModalVisible(false);
      editForm.resetFields();
    });
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const checkAndNotifyTasks = (tasks: Task[]) => {
    const now = dayjs();
    const oneHourLater = now.add(1, "hour");

    tasks.forEach((task) => {
      const due = dayjs(task.dueDate);
      if (due.isAfter(now) && due.isBefore(oneHourLater) && !notifiedTaskIds.current.has(task._id)) {
        toast.warning(`⏰ "${task.title}" is due at ${due.format("HH:mm")} today.`, {
          autoClose: 5000,
        });
        notifiedTaskIds.current.add(task._id);
      }
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // debounce 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    checkAndNotifyTasks(tasks);
  }, [tasks]);

  return (
    <div style={{ padding: 60, backgroundColor: "#f2f0f5", width: "100%", minHeight: "100vh" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 26 }}>
        <Title level={2}>ZigTask Dashboard</Title>
        <Button onClick={logout}>Logout</Button>
      </Row>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col span={8}>
          <RangePicker onChange={setDateRange} />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            New Task
          </Button>
        </Col>
      </Row>

      <DragDropContext onDragEnd={onDragEnd} enableDefaultSensors>
        <Row gutter={16} style={{ padding: 20 }}>
          {Object.entries(groupedTasks).map(([status, list]) => (
            <TaskColumn
              key={status}
              status={status as "To Do" | "In Progress" | "Done"}
              tasks={list}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </Row>
      </DragDropContext>

      <TaskFormModal
        isVisible={isModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsModalVisible(false)}
        form={form}
      />
      <EditTaskModal
        isVisible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onUpdate={handleUpdate}
        form={editForm}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
