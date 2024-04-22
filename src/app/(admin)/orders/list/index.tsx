import { FlatList } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";

export default function MenuScreen() {
  const filterOrder = orders.filter((e) => e.status !== "Entregue");

  return (
    <FlatList
      data={filterOrder}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
