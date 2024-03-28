import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductsListItem";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("");

  const router = useRouter();

  const product = products.find((e) => e.id.toString() === id);

  if (!product) {
    return <Text>Produto não encontrado!</Text>;
  }

  const addToCart = () => {
    if (!selectedSize) {
      Alert.alert("Selecione um Tamanho");
      return; // Retorna imediatamente se nenhum tamanho estiver selecionado
    }

    if (!product) {
      return; // Retorna imediatamente se não houver produto
    }

    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>R${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
