import { React, useState } from 'react';
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Flex,
  Center,
  Button,
  Image,
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import logo from '../assets/images/logoWhite.png';
import toast, { Toaster } from 'react-hot-toast';
import styles from './AuthPage.module.css';
import catMeme from '../assets/images/CatMeme.jpg';
import axios from 'axios';
const AuthPage = () => {
  if (localStorage.getItem('user')) {
    //If we already login, it will redirect to Home Page
    window.location.href = '/calendar';
  }
  const [activeTab, setActiveTab] = useState(0); //acTive Tab to control the <TabPanel> that is displayed in <TabPanels>
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const [email, setEmail] = useState('');

  const handleLoginClick0 = () => {
    //If we click the Login => Change to Login Tab
    setActiveTab(0);
  };

  const handleLoginClick1 = () => {
    //If we click the Login => Change to Login Tab
    setActiveTab(1);
  };

  const handleTabChange = index => {
    //if we click to other tab, that's change the index to move to the corresponding tab
    setActiveTab(index);
  };

  const openModal = () => {
    // Function to open the modal
    setShowModal(true);
  };

  const closeModal = () => {
    // Function to close the modal
    setShowModal(false);
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/forgotpassword',
        { email },
      );

      if (response.status === 200) {
        // console.log(response.data);
        // const { token } = response.data;
        // window.location.href = `/forgotpassword?email=${encodeURIComponent(
        //   email,
        // )}&token=${encodeURIComponent(token)}`;
        toast.success('Reset password email sent');
        setShowModal(false);
      } else {
        toast.error('Email not found');
      }
    } catch (error) {
      console.log(error);
      toast.error(' Can not change password right now');
    }
  };
  const handleEmailChange = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  return (
    <div>
      <Flex
        alignContent={'center'}
        justifyContent={'center'}
        display="flex"
        flexDirection={'column'}
        w={'50%'}
        h={'100vh'}
        m={'auto'}
        fontFamily={'Montserrat'}
      >
        <Box
          d="flex"
          textAlign="center"
          p={3}
          backgroundImage={'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)'}
          w="100%"
          height={'180px'}
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
        >
          <Image
            src={logo}
            alt="Productify Logo"
            boxSize={80}
            marginTop={'-10'}
            marginBottom={'-20'}
            position="absolute"
            left="50%"
            transform="translate(-50%, -10%)"
          />
        </Box>
        <Box
          bg={'white'}
          w="100%"
          borderRadius="lg"
          color="black"
          p={4}
          borderWidth="1px"
        >
          <Tabs
            variant="soft-rounded"
            index={activeTab}
            onChange={handleTabChange}
          >
            <TabList mb="1em">
              <Tab
                bg="white"
                _selected={{
                  backgroundImage:
                    'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)',
                }}
                width="50%"
                className={styles.tab}
              >
                Login
              </Tab>
              <Tab
                width="50%"
                bg="white"
                className={styles.tab}
                _selected={{
                  backgroundImage:
                    'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)',
                }}
              >
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
                <div className="mt-3 d-flex justify-content-between">
                  <div>
                    <b>
                      Don't Have Account?{' '}
                      <span
                        style={{ color: '#0077b6' }}
                        onClick={handleLoginClick1}
                      >
                        Sign Up
                      </span>
                    </b>
                  </div>
                  <div>
                    <b>
                      <span className={styles.forgetpass} onClick={openModal}>
                        Forget your password ?
                      </span>{' '}
                    </b>
                  </div>
                  {/* If we click Sign Up, it will move to Sign Up Components */}
                </div>
              </TabPanel>
              <TabPanel>
                <Signup />
                <div className="mt-3 text-center">
                  {' '}
                  {/*  */}
                  <b>
                    Already Have Account?{' '}
                    <span
                      style={{ color: '#0077b6' }}
                      onClick={handleLoginClick0}
                    >
                      Login
                    </span>
                  </b>{' '}
                  {/* If we click Login, it will move to Login Components */}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            maxWidth="500px"
            position="relative"
          >
            <Box borderBottom="1px solid #000">
              <Text fontSize="lg" fontWeight="bold">
                Forget your password?
              </Text>
            </Box>
            <Box py={4}>
              <Text>Relax and try to remember your password, my friend.</Text>
              <Text>(I know you can do it!!!)</Text>
            </Box>
            <Flex justifyContent="center" alignItems="center" height="200px">
              <Image
                src={catMeme}
                alt="Meme"
                boxSize="200px"
                objectFit="cover"
              />
            </Flex>
            <Flex flexDirection="column" alignItems="center" py={4}>
              <p style={{ fontSize: 'x-small', margin: '0' }}>
                In case you gave up, type your email and change password here:
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="email"
                  onChange={handleEmailChange}
                  style={{
                    padding: '6px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    fontSize: 'x-small',
                  }}
                />
                <button
                  onClick={handleResetPassword}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#337ab7',
                    color: '#fff',
                    fontSize: 'x-small',
                    cursor: 'pointer',
                    height: '26px',
                    marginLeft: '8px',
                  }}
                >
                  Submit
                </button>
              </div>
            </Flex>

            <Box pt={1}>
              <Flex justifyContent="flex-end">
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={closeModal}
                >
                  Thanks
                </Button>
              </Flex>
            </Box>
          </Box>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default AuthPage;
