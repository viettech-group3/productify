import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../service/user';
import toast, { Toaster } from 'react-hot-toast';
import { setUser } from '../../slices/UserStateSlice';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoad(true);
    if (!email || !password) {
      toast.error('You have to fill in both email and password');
      setLoad(false);
      return;
    }
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/calendar');
      setLoad(false);
    } catch (error) {
      console.log(error);
      toast.error('Your Email or Password is not correct');
      setLoad(false);
    }
  };

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email adress</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <InputRightElement width="4.5em">
            <Button h="1.75em" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        // background={"#a9caee"}
        backgroundImage={'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)'}
        _hover={{ background: '#a9caee' }}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={load}
      >
        Log in
      </Button>
    </VStack>
  );
};

export default Login;
