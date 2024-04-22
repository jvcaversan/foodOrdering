import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Link, router, Stack } from "expo-router";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else Alert.alert("Conta criada com Sucesso!");

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Fazer Cadastro" }} />
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

      <Button
        text={loading ? "Criando Cadastro" : "Fazer Cadastro"}
        disabled={loading}
        onPress={signUpWithEmail}
      />

      <Link href="/sign-in" style={styles.textButton}>
        Efetuar Login
      </Link>
    </View>
  );
};

export default SignUp;

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
