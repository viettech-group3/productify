import { React, useState } from "react";
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
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import toast, { Toaster } from 'react-hot-toast';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0); //acTive Tab to control the <TabPanel> that is displayed in <TabPanels>
  const handleLoginClick0 = () => {  //If we click the Login => Change to Login Tab
    setActiveTab(0);
  }

  const handleLoginClick1 = () => {  //If we click the Login => Change to Login Tab
    setActiveTab(1);
  }

  const handleTabChange = (index) => {  //if we click to other tab, that's change the index to move to the corresponding tab
    setActiveTab(index);
  }


  return (
    <div style={{backgroundColor:"whitesmoke"}}> 
      <Flex
        alignContent={"center"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        w={"50%"}
        h={"100vh"}
        m={"auto"}
        backgroundColor="whitesmoke"
        
      >
        <Box
          d="flex"
          textAlign="center"
          p={3}
          bg={"white"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          border= "solid 1px #ced4da"
          
        >
          <Text fontSize="4xl"  fontWeight={500}>Productify</Text>
        </Box>
        <Box
          bg={"white"}
          w="100%"
          borderRadius="lg"
          color="black"
          p={4}
          borderWidth="1px"
          border= "solid 1px #ced4da"
          paddingBottom = "0px"
        >
          <Tabs variant="soft-rounded" index={activeTab} onChange={handleTabChange}>  {/* control index by useState and onChange */}
            <TabList mb="1em">
              <Tab width="50%">
              Login
              </Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels >
              <TabPanel>
                <Login />
                <div className="mt-3 text-center">
                  <b>Don't Have Account? <span style={{color: "#0077b6"}} onClick={handleLoginClick1}>Sign Up</span></b>   {/* If we click Sign Up, it will move to Sign Up Components */}
                </div>
              </TabPanel>
              <TabPanel>
                <Signup />
                <div className="mt-3 text-center">  {/*  */}
                  <b>Already Have Account? <span style={{color: "#0077b6"}} onClick={handleLoginClick0}>Login</span></b>   {/* If we click Login, it will move to Login Components */}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Toaster/>
    </div>
  );
};

export default AuthPage;
