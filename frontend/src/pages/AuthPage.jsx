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
  Image,
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import logo from '../assets/images/logoWhite.png';
import toast, { Toaster } from 'react-hot-toast';

const AuthPage = () => {
  if (localStorage.getItem('user')) {
    //If we already login, it will redirect to Home Page
    window.location.href = '/calendar';
  }
  const [activeTab, setActiveTab] = useState(0); //acTive Tab to control the <TabPanel> that is displayed in <TabPanels>
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
              >
                Login
              </Tab>
              <Tab
                width="50%"
                bg="white"
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
                <div className="mt-3 text-center">
                  <b>
                    Don't Have Account?{' '}
                    <span
                      style={{ color: '#0077b6' }}
                      onClick={handleLoginClick1}
                    >
                      Sign Up
                    </span>
                  </b>{' '}
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
      <Toaster />
    </div>
  );
};

export default AuthPage;
