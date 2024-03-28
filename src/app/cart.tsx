import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "../providers/CartProvider";
import CartListItem from "@/src/components/CartListItem";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const CartScreen = () => {
  const { items, total } = useCart();

  const router = useRouter();

  const backMenu = () => {
    router.dismiss();
    router.push("/(tabs)/menu");
  };

  const isCartEmpty = items.length === 0;
  return (
    <View style={{ padding: 10 }}>
      {isCartEmpty ? (
        <>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              alignSelf: "center",
              marginVertical: 20,
            }}
          >
            Carrinho Vazio
          </Text>
          <Button text="Voltar ao Menu" onPress={backMenu} />
        </>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
          />
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
            Total: R${total.toFixed(2)}
          </Text>
          <Button text="Finalizar Compra" />
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
