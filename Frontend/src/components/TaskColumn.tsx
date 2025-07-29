import { Col, Typography } from "antd";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import React from "react";
import type { Task } from "../contexts/TaskTypes";

const { Title } = Typography;

interface TaskColumnProps {
  status: "To Do" | "In Progress" | "Done";
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, onEdit, onDelete }) => (
  <Col span={8}>
    <Title level={4}>{status}</Title>
    <Droppable droppableId={status}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 100 }}>
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <TaskCard
                  task={task}
                  provided={provided}
                  onEdit={onEdit}
                  index={index}
                  onDelete={onDelete}
                  isDragging={snapshot.isDragging}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </Col>
);

export default React.memo(TaskColumn);
