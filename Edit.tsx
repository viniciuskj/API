import {
  Text,
  Input,
  Button,
  SimpleGrid,
  Card,
  Box,
  Grid,
  GridItem,
  Divider,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  // esse useParams() recupera o id da amostra da url e salva na constante sampleId

  const { sampleId }: any = useParams();

  const [currentSample, setCurrentSample] = useState<Sample>();

  interface Sample {
    id: string;
    mp10: number;
    mp25: number;
    co: number;
    no2: number;
    so2: number;
    o2: number;
  }

  // getCurrentSample é a função para pegar as informacoes de uma amostra com um id especifico e salva na variavel currentSample
  // currentSample é usado para setar os default values dos inputs

  const getCurrentSample = async () => {
    try {
      console.log(sampleId);
      const response = await axios.get(
        `http://127.0.0.1:5000/samples/${sampleId}`
      );
      setCurrentSample(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCurrentSample();
  }, []);

  // onSubmit é chamada quando o formulario é enviado, recebe formData onde os campos sao registrados e envia um objeto com tudo.

  const onSubmit = async (formData: any) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/samples/${sampleId}`,
        {
          mp10: formData.mp10,
          mp25: formData.mp25,
          so2: formData.so2,
          no2: formData.no2,
          co: formData.co,
          o2: formData.o2,
        }
      );
      history.push("/list");
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={100}>
        <GridItem textAlign="left">
          <Navbar />
        </GridItem>
        <GridItem>
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem pt="50px" ml="-50px" pl="100px">
          <Box textAlign="left">
            <Text pl="20px" fontWeight="bold" fontSize="3xl">
              Editar amostra
            </Text>
            <Text pl="20px" pb="100px" fontSize="md">
              Preencha os campos que deseja editar
            </Text>
          </Box>
          <Card h="455px" width="650px" borderRadius="30px">
            <SimpleGrid
              columns={2}
              spacingX={10}
              spacingY={5}
              textAlign="left"
              p="50px"
            >
              <div>
                <FormLabel
                  display="flex"
                  ms="10px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                >
                  MP10
                </FormLabel>
                <Input
                  defaultValue={currentSample?.mp10}
                  type="number"
                  borderRadius="30px"
                  borderColor="gray.400"
                  {...register("mp10")}
                />
              </div>
              <div>
                <FormLabel
                  display="flex"
                  ms="10px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                >
                  MP25
                </FormLabel>
                <Input
                  defaultValue={currentSample?.mp25}
                  type="number"
                  borderRadius="30px"
                  borderColor="gray.400"
                  {...register("mp25")}
                />
              </div>
              <div>
                <FormLabel
                  display="flex"
                  ms="10px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                >
                  CO
                </FormLabel>
                <Input
                  defaultValue={currentSample?.co}
                  type="number"
                  borderRadius="30px"
                  borderColor="gray.400"
                  {...register("co")}
                />
              </div>
              <div>
                <FormLabel
                  display="flex"
                  ms="10px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                >
                  O2
                </FormLabel>
                <Input
                  defaultValue={currentSample?.o2}
                  type="number"
                  borderRadius="30px"
                  borderColor="gray.400"
                  {...register("o2")}
                />
              </div>
              <div>
                <FormLabel
                  display="flex"
                  ms="10px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                >
                  NO2
                </FormLabel>
                <Input
                  defaultValue={currentSample?.no2}
                  type="number"
                  borderRadius="30px"
                  borderColor="gray.400"
                  {...register("no2")}
                />
              </div>
              <div>
                <FormLabel
                  display="flex"
                  ms="10px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                >
                  SO2
                </FormLabel>
                <Input
                  defaultValue={currentSample?.so2}
                  type="number"
                  borderRadius="30px"
                  borderColor="gray.400"
                  {...register("so2")}
                />
              </div>
            </SimpleGrid>
            <Button
              colorScheme="blue"
              w="170px"
              fontWeight="normal"
              fontSize="sm"
              height="50px"
              borderRadius="14"
              mr="50px"
              onClick={handleSubmit(onSubmit)}
              textAlign="center"
              ms="auto"
            >
              Editar
            </Button>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}
