import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../service/user';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../slices/UserStateSlice';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!username || !email || !password) {
      toast.error('You have to fill in all boxes');
      setLoading(false);
      return;
    }
    try {
      const response = await createUser(email, username, password);
      localStorage.setItem('user', JSON.stringify(response));
      setLoading(false);

      navigate('/calendar');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter Your Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
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
        background={'#a9caee'}
        backgroundImage={'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)'}
        _hover={{ background: '#a9caee' }}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;
