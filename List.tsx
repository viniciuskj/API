import {
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Card,
  Box,
  Grid,
  GridItem,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Page() {
  const history = useHistory();

  const [samples, setSamples] = useState<Samples[]>([]);
  interface Samples {
    id: string;
    mp10: number;
    mp25: number;
    co: number;
    no2: number;
    so2: number;
    o2: number;
  }

  // getSamples é a função que puxa todos os registros do banco, e salva na variavel samples
  // onDelete é a função que deleta um amostra, ela recebe um id como parametro e usa esse id para mandar a requisicao de delete

  const getSamples = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/samples");
      setSamples(response.data.samples);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSamples();
  }, []);

  const onDelete = async (sampleId: string) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/samples/${sampleId}`
      );
      const updatedSamples = samples.filter(
        (current: any) => current.id !== sampleId
      );

      setSamples(updatedSamples);
    } catch (error) {
      console.log(error);
    }
  };

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
              Listagem
            </Text>
            <Text pl="20px" pb="100px" fontSize="md">
              Verifique todas as suas amostras cadastradas
            </Text>
          </Box>
          <Card h="-moz-max-content" width="1000px" borderRadius="30px">
            <Box>
              <TableContainer px="20px" py="40px">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>MP10</Th>
                      <Th>MP25</Th>
                      <Th>o2</Th>
                      <Th>SO2</Th>
                      <Th>NO2</Th>
                      <Th>CO</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* aqui usamos os registros que estao na variavel samples para fazer um map (do javascript normal) que para cada registro retorna uma
                      coluna da tabela. */}
                    {samples.map((sample) => {
                      return (
                        <Tr key={sample.id}>
                          <Td>{sample.mp10}</Td>
                          <Td>{sample.mp25}</Td>
                          <Td>{sample.o2}</Td>
                          <Td>{sample.so2}</Td>
                          <Td>{sample.no2}</Td>
                          <Td>{sample.co}</Td>
                          <Td>
                            {/* esse botao leva para a edicao passando o id da amostra na url */}
                            <IconButton
                              colorScheme="blue"
                              mr="15px"
                              aria-label="Editar"
                              icon={<EditIcon />}
                              onClick={() => {
                                history.push(`/edit/${sample.id}`);
                              }}
                            />
                            {/* esse botao chama a funcao onDelete e passa o id da amostra como parametro */}
                            <IconButton
                              colorScheme="red"
                              aria-label="Excluir"
                              icon={<DeleteIcon />}
                              onClick={() => onDelete(sample.id)}
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}
