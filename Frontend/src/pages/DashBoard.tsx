import { useTask } from "../contexts/TaskContext";
import { useAuth } from "../contexts/AuthContext";
import { Button, Card, Col, Input, Modal, Row, Typography, DatePicker, Form } from "antd";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const { tasks, updateTask, addTask } = useTask();
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const filteredTasks = tasks.filter((task) => {
    const matchTitle = task.title.toLowerCase().includes(search.toLowerCase());
    const matchDate = dateRange
      ? dayjs(task.dueDate).isAfter(dateRange[0], "day") && dayjs(task.dueDate).isBefore(dateRange[1], "day")
      : true;
    return matchTitle && matchDate;
  });

  const groupedTasks = {
    "To Do": filteredTasks.filter((t) => t.status === "To Do"),
    "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
    Done: filteredTasks.filter((t) => t.status === "Done"),
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    const updatedTask = tasks.find((t) => t._id === draggableId);
    if (updatedTask) {
      updateTask({ ...updatedTask, status: destination.droppableId });
    }
  };

  const handleCreate = () => {
    form.validateFields().then((values) => {
      console.log({ values });
      addTask({ ...values, status: "To Do" });
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={16}>
          {Object.entries(groupedTasks).map(([status, list]) => (
            <Col span={8} key={status}>
              <Title level={4}>{status}</Title>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {list.map((task, index) => (
                      <Draggable draggableId={task._id} index={index} key={task._id}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ marginBottom: 12 }}
                          >
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </DragDropContext>

      <Modal title="Create Task" open={isModalVisible} onOk={handleCreate} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title">
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="description" label="Description">
            {" "}
            <Input.TextArea />{" "}
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date">
            {" "}
            <DatePicker style={{ width: "100%" }} />{" "}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
