import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../../context/Context';
import { useToast } from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import "./Login.scss"

function Login() {
  const [datas, setdata] = useState({ email: '', password: '' });
  const { setUserInfo, navigate, setSignup, setShownav } = useContext(MyContext);
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (event) => {
    setdata({ ...datas, [event.target.name]: event.target.value });
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = datas;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);
      console.log(userInfo) 
      if (data._id && data.email && data.name) {
        showToast("Login successful!", "success");
        navigate("/");
        setShownav(true)
      }

    } catch (error) {
      showToast(
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "An error occurred while logging in. Please try again.",
        "error"
      );
    }
  };

  return (
    <VStack spacing="5px" align="stretch" height="110%" width="90%">
      <FormControl id="email" isRequired>
        <FormLabel color="rgb(153, 102, 255)">Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          onChange={handleChange}
          bg="rgb(204, 153, 255)"
          color="white"
          borderColor="rgb(153, 102, 255)"
          _placeholder={{ color: "gray.500" }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color="rgb(153, 102, 255)">Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            bg="rgb(204, 153, 255)"
            color="white"
            borderColor="rgb(153, 102, 255)"
            _placeholder={{ color: "gray.500" }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick} colorScheme="purple">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        h="40px"
        style={{ marginTop: 15 }}
        onClick={sendData}
      >
        Login
      </Button>
      <p className="text-white text-sm mt-2">
        Don't have an account?{" "}
        <a onClick={() => setSignup("signup")} className="cursor-pointer text-blue-500">
          Sign Up
        </a>
      </p>
    </VStack>
  );
}

export default Login;
