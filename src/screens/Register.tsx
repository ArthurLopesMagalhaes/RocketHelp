import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

import firestore from "@react-native-firebase/firestore";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleNewOrder() {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos");
    }
    setIsLoading(true);
    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso");
        navigation.goBack();
      })
      .catch((error) => {
        setIsLoading(false);
        return Alert.alert("Solicitação", "Não foi possível registar o pedido");
      });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova Solicitação" />
      <Input
        placeholder="Número do patrimônio"
        onChangeText={(txt) => setPatrimony(txt)}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={(txt) => setDescription(txt)}
      />
      <Button
        title="Cadastrar"
        isLoading={isLoading}
        onPress={handleNewOrder}
      />
    </VStack>
  );
};
