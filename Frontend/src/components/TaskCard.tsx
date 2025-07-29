import type { DraggableProvided } from "@hello-pangea/dnd";
import { Card, Button, Space, Popconfirm } from "antd";
import type { Task } from "../contexts/TaskTypes";
import React from "react";
import dayjs from "dayjs";

interface TaskCardProps {
  task: Task;
  index: number;
  provided: DraggableProvided;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isDragging: boolean;
}

const TaskCard = ({ task, provided, onEdit, onDelete, isDragging }: TaskCardProps) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      marginBottom: 12,
      ...provided.draggableProps.style,
      boxShadow: isDragging ? "0 6px 18px rgba(0,0,0,0.15)" : "none",
    }}
    // onClick={() => onEdit(task)}
  >
    <Card>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <p>Due: {dayjs(task.dueDate).format("YYYY-MM-DD HH:mm")}</p>

      <Space style={{ position: "absolute", top: 8, right: 8 }}>
        <Button style={{ background: "#f0f0f0" }} type="text" onClick={() => onEdit(task)}>
          ✏️
        </Button>
        <Popconfirm title="Delete this task?" onConfirm={() => onDelete(task._id)} okText="Yes" cancelText="No">
          <Button style={{ background: "#f0f0f0" }} type="text" danger>
            🗑️
          </Button>
        </Popconfirm>
      </Space>
    </Card>
  </div>
);

export default React.memo(TaskCard);
