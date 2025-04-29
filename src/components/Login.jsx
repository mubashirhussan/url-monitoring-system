import { Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onFinish = ({ email, password }) => {
    const isAuthenticated = email === "admin@gmail.com" && password === "123";

    if (isAuthenticated) {
      setLoginError(""); // clear error
      navigate("/admin-dashboard");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/logo.png"
          className="mx-auto h-30 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm login-form">
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={
              <div className="w-full flex justify-between items-center">
                <span>Password</span>
                <a
                  href="/forgot-password"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {loginError && (
            <div className="text-red-600 text-sm mb-4">{loginError}</div>
          )}
          <Form.Item>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center rounded-md !bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:!outline-indigo-600"
            >
              Sign in
            </button>
          </Form.Item>
        </Form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not registered?{" "}
          <a
            href="/registration"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
