import { Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "../providers/CartProvider";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <View>
      <Text>Cart Items lenght: {items.length}</Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
