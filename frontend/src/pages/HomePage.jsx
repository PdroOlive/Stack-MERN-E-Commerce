import { Container, Text, VStack } from '@chakra-ui/react'
import { AiFillProduct } from "react-icons/ai";
import { SimpleGrid } from "@chakra-ui/react"
import { TbShoppingBagX } from "react-icons/tb";
import { Link } from 'react-router'
import { useEffect } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';



const HomePage = () => {
    const {fetchProducts, products} = useProductStore()
    useEffect(() => {
        fetchProducts()

    }, [fetchProducts])
    console.log("products", products)

    return(
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                <Text
                fontSize={"30"}
                fontWeight={"bold"}
                bgGradient={'linear(to-r, #8300fd, #41007e)'}
                bgClip={"text"}
                textAlign={"center"}
                display={"flex"}
                gap={1}
                alignItems={"center"}
                >
                    <span> Current Products </span> <AiFillProduct color='#41007e' fontSize={30} />

                </Text>

                <SimpleGrid 
                columns={{
                    base:1,
                    md: 2,
                    lg: 3
                }} 
                spacing={10}
                w={"full"}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                    
                </SimpleGrid>

                {products.length === 0 && (
                    <Text
                fontSize={"xl"}
                textAlign={"center"}
                fontWeight={"bold"}
                color={"gray.500"}
                display={"flex"}
                alignItems={"center"}
                gap={2}
                >
                    <span>No Products found</span> <TbShoppingBagX fontSize={25}/>
                    <Link to={"/create"}>
                        <Text 
                        as="span"
                        color={"#41007e"}
                        _hover={{ textDecoration: "underline" }}
                        >
                            Create a Product

                        </Text>
                    </Link>
                </Text>
                )}                

            </VStack>

        </Container>
    )
}

export default HomePage