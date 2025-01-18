import { Box, Button, Heading, HStack, IconButton, Image, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { FiEdit, FiDelete } from "react-icons/fi";
import { useProductStore } from "../store/product";
import { useState } from "react";


const ProductCard = ({ product }) => {
    const [updateProduct, setUpdatedProduct] = useState(product)

    const currentPrice = Number(product.price).toLocaleString("en-US", {style: "currency", currency: "USD"});

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800")

    const toast = useToast();
    const { deleteProduct, updatedProduct } = useProductStore()
    const { isOpen, onOpen, onClose } = useDisclosure();

    async function handleDeleteProduct(productId) {
        const { success, message } = await deleteProduct(productId);

        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 1000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
                duration: 1000
            })
        }
    }
    async function handleUpdateProduct(productId, updateProduct) {
        const { success, message } = await updatedProduct(productId, updateProduct);
        onClose();

        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 1000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
                duration: 1000
            })
        }
    }


    return(
        <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 300ms"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
        >
            <Image 
            src={product.image} 
            alt={product.name} 
            h={48}
            w={"full"}
            objectFit="cover"
            />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    {currentPrice}

                </Text>

                <HStack>
                    <IconButton icon={<FiEdit />} colorScheme="purple" onClick={onOpen}/>
                    <IconButton icon={<FiDelete />} colorScheme="red" onClick={() => handleDeleteProduct(product._id)}/>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                        
                            <Input 
                            variant={"filled"} 
                            placeholder="Product Name"
                            name="name"
                            value={updateProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updateProduct, name: e.target.value })}
                            />

                            <InputGroup flex="1" startElement="$" >
                                <Input 
                                variant={"filled"}
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={updateProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updateProduct, price: e.target.value })}
                                />
                            </InputGroup>
                            <Input 
                            variant={"filled"} 
                            placeholder="Image URL"
                            name="image"
                            value={updateProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updateProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="purple" mr={3}
                        onClick={() => handleUpdateProduct(product._id, updateProduct)} 
                        >
                            Update
                        </Button>
                        <Button variant={"ghost"} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </Box>

    )
}

export default ProductCard;