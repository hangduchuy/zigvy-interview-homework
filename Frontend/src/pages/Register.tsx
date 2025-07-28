import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await register(values.email, values.password);
      navigate("/");
    } catch (err) {
      message.error("Register failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <Title level={2}>Register</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        Đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
      </div>
    </div>
  );
};

export default Register;
