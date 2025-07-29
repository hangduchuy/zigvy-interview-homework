import { DatePicker, Form, Input, Modal } from "antd";

const TaskFormModal = ({ isVisible, onCreate, onCancel, form }) => (
  <Modal title="Create Task" open={isVisible} onOk={onCreate} onCancel={onCancel}>
    <Form form={form} layout="vertical">
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

export default TaskFormModal;
