import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { Localize } from "../utils/Localize";
import { useAuth } from "../hooks";
import { UserAuth } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (data: UserAuth) => {
    if (await login?.(data)) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
          <h2 className="pb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {Localize.LoginToYourAccount}
          </h2>
        </div>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<UserAuth>
            label="Username"
            name="username"
            rules={[{ required: true, message: Localize.UsernameRequired }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UserAuth>
            label="Password"
            name="password"
            rules={[{ required: true, message: Localize.PasswordRequired }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }} className="mt-12">
            <Button type="primary" htmlType="submit">
              {Localize.Login}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
