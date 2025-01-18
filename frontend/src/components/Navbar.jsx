import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { FaCartShopping, FaRegSquarePlus } from "react-icons/fa6";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Link } from 'react-router'


const Navbar = () => {

    const {colorMode, toggleColorMode} = useColorMode();
    const iconsSize = 20;
    return(
        <Container maxW={'1140px'} px={4}>
            <Flex 
            h={16}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexDir={{
                base: "column",
                sm:"row"
            }} >
                <Link 
                to={"/"}>
                    <Text
                    bgGradient='linear(to-r, #8300fd, #41007e)'
                    bgClip='text'
                    fontSize={{
                        base: "22",
                        sm: "28"
                    }}
                    fontWeight='bold'
                    textAlign={"center"}
                    textTransform={"uppercase"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                    >
                        
                        <span>Product Store</span> <FaCartShopping color="#41007e" fontSize={25}/>
                    </Text>
                </Link>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <FaRegSquarePlus fontSize={iconsSize} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    { colorMode === "light" ? <IoMoon fontSize={iconsSize} /> : <IoSunny fontSize={iconsSize} /> }

                </Button>

            </HStack>

            </Flex>

        </Container>
    )
}

export default Navbar