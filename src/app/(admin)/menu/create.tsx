import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductsListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetFields = () => {
    setName(""), setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Nome Inválido");
      return false;
    }
    if (!price) {
      setErrors("Preço Inválido");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Preço tem que ser um número");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdateCreate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    console.warn("Create a product: ", name, price);

    if (!validateInput()) {
      return;
    }

    //salvar os valores no database

    resetFields();
  };

  const onUpdateCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Editando o Produto: ", name, price);

    //salvar os valores no database

    resetFields();
  };

  const onDelete = () => {
    Alert.alert("Deletado", "Produto removido com sucesso.");
  };

  const confirmDelete = () => {
    Alert.alert("Confirme", "Você tem certeza que deseja deletar o produto?", [
      {
        text: "Cancelar",
      },
      {
        text: "Deletar",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Editar Produto" : "Criar Produto" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text onPress={pickImage} style={styles.textButton}>
        Selecione uma imagem
      </Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nome"
        style={styles.textInput}
      />

      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.textInput}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text={isUpdating ? "Editar" : "Criar"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Deletar
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "lightgrey",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
});
