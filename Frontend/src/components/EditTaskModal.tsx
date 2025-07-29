import { DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";

const EditTaskModal = ({ isVisible, onUpdate, onCancel, form, task }) => {
  return (
    <Modal title="Edit Task" open={isVisible} onOk={onUpdate} onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: task?.title,
          description: task?.description,
          dueDate: task?.dueDate ? dayjs(task.dueDate) : null,
        }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the task title!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: "100%" }} showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
