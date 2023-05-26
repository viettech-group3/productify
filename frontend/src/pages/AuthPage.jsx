import { React } from "react";
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
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import logo from "../assets/images/logoWhite.png";

const AuthPage = () => {
  return (
    <Flex
      alignContent={"center"}
      justifyContent={"center"}
      display="flex"
      flexDirection={"column"}
      w={"50%"}
      h={"100vh"}
      m={"auto"}
      fontFamily={'Montserrat'}
    >
      <Box
        d="flex"
        textAlign="center"
        p={3}
        backgroundImage={"linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)"}
        w="100%"
        height={"180px"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Image 
        src={logo} 
        alt="Productify Logo" 
        boxSize={80} 
        marginTop={"-10"} 
        marginBottom={"-20"}
        position="absolute"
          left="50%"
          transform="translate(-50%, -10%)"
        />
      </Box>
      <Box
        bg={"white"}
        w="100%"
        borderRadius="lg"
        color="black"
        p={4}
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab 
            bg="white"
            _selected={{ backgroundImage:"linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)"} }            width="50%"
            >
             Login
            </Tab>
            <Tab 
            width="50%"
            bg="white"
            _selected={{ backgroundImage:"linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)"} }
             
            >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default AuthPage;
