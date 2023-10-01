import {
  Text,
  Button,
  SimpleGrid,
  Card,
  Box,
  Grid,
  GridItem,
  Divider,
  Flex,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AddIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Page() {
  const history = useHistory();

  const [averages, setAverages] = useState<Averages>();
  interface Averages {
    co: number;
    mp10: number;
    mp25: number;
    no2: number;
    o2: number;
    so2: number;
    quality: {
      quality: string;
      index: string;
      message: string;
    };
  }

  // funcao que retorna as medias, a resposta do backend é salva na variavel averages

  const getAverages = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/samples/average");
      // seta a variavel averages para o valor da resposta do backend
      setAverages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAverages();
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={150}>
        <GridItem textAlign="left">
          <Navbar />
        </GridItem>
        <GridItem>
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem pt="50px" pr="20px">
          <Box textAlign="left">
            <Text pl="20px" fontWeight="bold" fontSize="3xl">
              Menu
            </Text>
            <Text pl="20px" pb="100px" fontSize="md">
              Verifique informações sobre o ar aqui
            </Text>
          </Box>
          <Card h="405px" width="1000px" borderRadius="30px" boxShadow="2xl">
            <SimpleGrid columns={2} spacing={1} textAlign="left">
              <Box pl="50px">
                <Text
                  fontWeight="bold"
                  fontSize="3xl"
                  pt="75px"
                  pl="30px"
                  zIndex={"auto"}
                >
                  Qualidade do ar: {averages?.quality?.quality}
                </Text>
                <Text pt="20px" pl="30px" fontSize="md">
                  {averages?.quality?.message}
                </Text>
                <Box justifyContent="space-around" pt="30px" pl="30px">
                  <Button
                    /* backgroundColor="#2e3749" */
                    colorScheme="blue"
                    w="170px"
                    fontWeight="normal"
                    fontSize="sm"
                    height="50px"
                    borderRadius="14"
                    mr="20px"
                    onClick={() => {
                      history.push("/create");
                    }}
                    textAlign="center"
                  >
                    Nova amostra
                    <AddIcon pl="5px" />
                  </Button>

                  <Button
                    colorScheme="blue"
                    w="170px"
                    fontWeight="normal"
                    fontSize="sm"
                    height="50px"
                    borderRadius="14"
                    gap="5px"
                    onClick={() => {
                      history.push("/list");
                    }}
                  >
                    Visualizar amostras
                    <Icon as={AiOutlineEye} />
                  </Button>
                </Box>
              </Box>

              <Box textAlign="right" pt="90" pr="200px">
                <Text fontSize="9xl" fontWeight="bold">
                  {averages?.quality?.index}
                </Text>
              </Box>
            </SimpleGrid>
          </Card>
          <Flex pt="100px">
            <Card
              boxShadow="2xl"
              width="140px"
              h="170px"
              borderRadius="15px"
              mr="32px"
            >
              <Text pt="20px" pr="50px">
                MP10
              </Text>
              <Text fontWeight="bold" fontSize="6xl" lineHeight="130px">
                {averages?.mp10 != null
                  ? Number(averages?.mp10).toFixed(0)
                  : ""}
              </Text>
            </Card>
            <Card
              boxShadow="2xl"
              width="140px"
              h="170px"
              borderRadius="15px"
              mr="32px"
            >
              <Text pt="20px" pr="50px">
                MP25
              </Text>
              <Text fontWeight="bold" fontSize="6xl" lineHeight="130px">
                {averages?.mp25 != null
                  ? Number(averages?.mp25).toFixed(0)
                  : ""}
              </Text>
            </Card>
            <Card
              boxShadow="2xl"
              width="140px"
              h="170px"
              borderRadius="15px"
              mr="32px"
            >
              <Text pt="20px" pr="50px">
                O2
              </Text>
              <Text fontWeight="bold" fontSize="6xl" lineHeight="130px">
                {averages?.o2 != null ? Number(averages?.o2).toFixed(0) : ""}
              </Text>
            </Card>
            <Card
              boxShadow="2xl"
              width="140px"
              h="170px"
              borderRadius="15px"
              mr="32px"
            >
              <Text pt="20px" pr="50px">
                NO2
              </Text>
              <Text fontWeight="bold" fontSize="6xl" lineHeight="130px">
                {averages?.no2 != null ? Number(averages?.no2).toFixed(0) : ""}
              </Text>
            </Card>
            <Card
              boxShadow="2xl"
              width="140px"
              h="170px"
              borderRadius="15px"
              mr="32px"
            >
              <Text pt="20px" pr="50px">
                SO2
              </Text>
              <Text fontWeight="bold" fontSize="6xl" lineHeight="130px">
                {averages?.so2 != null ? Number(averages?.so2).toFixed(0) : ""}
              </Text>
            </Card>
            <Card
              boxShadow="2xl"
              width="140px"
              h="170px"
              borderRadius="15px"
              mr="32px"
              mb="50px"
            >
              <Text pt="20px" pr="50px">
                CO
              </Text>
              <Text fontWeight="bold" fontSize="6xl" lineHeight="130px">
                {averages?.co != null ? Number(averages?.co).toFixed(0) : ""}
              </Text>
            </Card>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
