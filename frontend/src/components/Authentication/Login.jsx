import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../service/user';
import toast, { Toaster } from 'react-hot-toast';
import { setUser } from '../../slices/UserStateSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { set } from '../../slices/MonthEventsSlice';
import { createUser } from '../../service/user';

const Login = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');

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
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          },
        )
        .then(res => {
          LoginOrSignUp(res.data.email, res.data.name, res.data.id);
        })

        .catch(err => console.log(err));
    }
  }, [user]);

  const GoogleLoginHandler = useGoogleLogin({
    flow: 'auth-code',
    scope:
      'openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    onSuccess: async codeResponse => {
      console.log('codeResponse', codeResponse);
      let tokenData = await axios.post(
        'http://localhost:5000/api/users/getUserToken',

        codeResponse,
      );

      await setUser(tokenData.data);
      localStorage.setItem('ggToken', tokenData.data.refresh_token);
    },

    onError: error => console.log('Login Failed:', error),
  });

  const LoginOrSignUp = async (email, username, password) => {
    console.log('email', email, username, password);
    try {
      const checkUser = await axios.post(
        `http://localhost:5000/api/users/loginorsignup`,
        { email, username, password },
      );
      localStorage.setItem('user', JSON.stringify(checkUser.data));
      navigate('/calendar');
      // await submitHandler();
    } catch (error) {
      toast.error('Can not login with GG Auth right now');
    }
  };
  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
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
        style={{ marginTop: 15, marginBottom: 15 }}
        onClick={submitHandler}
        isLoading={load}
      >
        Log in
      </Button>
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Or
      </Text>
      <Button
        // background={"#a9caee"}
        backgroundImage={'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)'}
        _hover={{ background: '#a9caee' }}
        width="100%"
        style={{ marginTop: 15, alignSelf: 'center' }}
        onClick={() => GoogleLoginHandler()}
        isLoading={load}
      >
        Sign in with Google
      </Button>
    </VStack>
  );
};

export default Login;
