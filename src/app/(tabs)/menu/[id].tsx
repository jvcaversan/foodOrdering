import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductsListItem";

const sizes = ["P", "M", "G", "GG"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((e) => e.id.toString() === id);

  if (!product) {
    return <Text>Produto não encontrado!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text>Selecione o Tamanho</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <View style={styles.sizeItem} key={size}>
            <Text style={styles.sizesText}>{size}</Text>
          </View>
        ))}
      </View>

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
  sizeItem: {
    backgroundColor: "lightgray",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizesText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
