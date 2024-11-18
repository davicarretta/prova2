import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native"; // Importando View corretamente
import { supabase } from "../supabaseClient";

export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithEmail = async () => {
    console.log("Tentando cadastrar...");
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log("Erro no cadastro:", error);
      Alert.alert("Erro no cadastro", error.message);
    } else {
      console.log("Cadastro realizado com sucesso!");
      Alert.alert("Sucesso", "Cadastro realizado com sucesso! Verifique seu e-mail para confirmar.");
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie sua conta!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signupButton} onPress={signUpWithEmail}>
        <Text style={styles.signupButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <TouchableOpacity
          style={[styles.signupButton, styles.backButton]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.signupButtonText}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f0f8ff",  // Background suave
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
    color: "#4a90e2",  // Cor mais viva para o título
  },
  input: {
    width: "80%",  // Caixa de digitação menor
    height: 45,    // Menor altura para os campos
    borderColor: "#ddd",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    elevation: 3,  // Sombra suave nos campos de entrada
  },
  linksContainer: {
    width: "80%",  // Centralizando os links
    alignItems: "center",  // Centralizando os links
    marginBottom: 24,
  },
  signupButton: {
    width: "80%",  // Botão com a mesma largura dos campos de input
    height: 55,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,  // Sombra suave para o botão
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "#58608C",
    marginTop: 10,
  },
});
