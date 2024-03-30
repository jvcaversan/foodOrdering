import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.warn("Login Efetuado");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Fazer Login" }} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textInput}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
        placeholder=""
        secureTextEntry
      />

      <Button text={"Efetuar Login"} onPress={onSubmit} />

      <Link href="/sign-up" style={styles.textButton}>
        Criar uma conta
      </Link>
    </View>
  );
};

export default SignIn;

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
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
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
});
