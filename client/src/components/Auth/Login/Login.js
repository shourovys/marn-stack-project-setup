import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { logInApi, sineUpApi } from "../../../APi";
import { useUserData } from '../../Context/userContext';
import "./Login.css";
import { isEmailAvailable, validateInput } from "./ValidetionFunction";


const Login = () => {
  const {setUser} = useUserData()
  const [formData, setFormData] = useState(null);
  const [inputValue, setInputValue] = useState({
    name: {},
    email: {},
    password: {},
    confirmPassword: {},
  });

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  const handelChange = (input) => {
    setInputValue({
      ...inputValue,
      [input.placeholder]: {
        value: input.value,
        ...validateInput(input.placeholder, input.value,inputValue.password.value),
      },
    });
  };
  const handelBlur = async (input) => {
    
    if (inputValue.name.value || inputValue.confirmPassword.value) {
      setInputValue({
        ...inputValue,
        [input.placeholder]: {
          value: input.value,
          validateStatus: "validating",
        },
      });
      const res = await isEmailAvailable(input.value)
      setInputValue({
        ...inputValue,
        [input.placeholder]: {
          value: input.value,
          ...res,
        },
      });
    }
  };


  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    setFormData(values);
  };

  const loginUser = async () =>{
    const data = await logInApi(formData)
    setUser(data.data)
  }
  const sideUpUser = async () =>{
    const data = await sineUpApi(formData)
    setUser(data.data)
  }

  const history = useHistory()

  useEffect(() => {
    try {
      if (formData) {
        if (!formData.name) {
          loginUser()
        }else{
          sideUpUser()
        }
        history.push('/')
      } 
    } catch (error) {
      console.log(error);
    }
  }, [formData])

  const path = useLocation().pathname;

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
      className="form"
    >
      {path === "/sineUp" && (
        <Form.Item
          className = "form__input"
          hasFeedback
          name="name"
          validateStatus={inputValue.name.validateStatus}
          help={inputValue.name.errorMsg}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="name"
            value={inputValue.name.value}
            onChange={(e) => handelChange(e.target)}
          />
        </Form.Item>
      )}
      <Form.Item
        className = "form__input"
        hasFeedback
        name="email"
        validateStatus={inputValue.email.validateStatus }
        help={inputValue.email.errorMsg}
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email"
          value={inputValue.email.value}
          onChange={(e) => handelChange(e.target)}
          onBlur={(e) => handelBlur(e.target)}
        />
      </Form.Item>
      <Form.Item
        className = "form__input"
        hasFeedback
        name="password"
        validateStatus={inputValue.password.validateStatus}
        help={inputValue.password.errorMsg}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input
          className = "form__input"
          hasFeedback
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="password"
          value={inputValue.password.value}
          onChange={(e) => handelChange(e.target)}
        />
      </Form.Item>
      {path === "/sineUp" && (
        <Form.Item
          className = "form__input"
          hasFeedback
          name="confirmPassword"
          validateStatus={inputValue.confirmPassword.validateStatus}
          help={inputValue.confirmPassword.errorMsg}
          rules={[
            {
              required: true,
              message: "Please input your confirmPassword!",
            },
          ]}
        >
          <Input
            className = "form__input"
            hasFeedback
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="Password"
            placeholder="confirmPassword"
            value={inputValue.confirmPassword.value}
            onChange={(e) => handelChange(e.target)}
          />
        </Form.Item>
      )}
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            {path === "/sineUp" ? "sine up" : "Log in"}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default Login;
