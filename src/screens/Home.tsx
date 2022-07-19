import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";

import Logo from "../assets/logo_secondary.svg";
import { ChatTeardropText } from "phosphor-react-native";

import { SignOut } from "phosphor-react-native";
import { Filter } from "../components/Filter";
import { useState } from "react";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const navigation = useNavigation();

  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "closed"
  );

  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate("Register");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("Details", { orderId });
  }

  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "12afsagdf3",
      patrimony: "95u90433",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
  ]);

  return (
    <VStack flex={1} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            title="finalizdos"
            type="closed"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText size={40} color={colors.gray[300]} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {"\n"}
                solicitações{" "}
                {statusSelected === "open" ? "em aberto" : "finalizados"}
              </Text>
            </Center>
          )}
        />
        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};
