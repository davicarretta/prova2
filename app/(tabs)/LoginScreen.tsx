import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  GroupDetails: { group: any };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.log("Erro no login:", error);
        console.log("Mensagem de erro:", error.message);

        if (error.message.toLowerCase().includes("invalid login credentials")) {
          Alert.alert("Erro no login", "E-mail ou senha incorretos.");
        } else if (error.message.toLowerCase().includes("email not confirmed")) {
          Alert.alert("Erro no login", "E-mail não confirmado. Verifique sua caixa de entrada.");
        } else {
          Alert.alert("Erro no login", error.message);
        }
      } else {
        Alert.alert("Login realizado com sucesso!");
        navigation.navigate('Home');
      }
    } catch (err) {
      console.error("Erro inesperado no login:", err);
      Alert.alert("Erro inesperado", "Algo deu errado. Tente novamente mais tarde.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Acesse sua conta</Text>
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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f0f8ff',  // Background suave
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#4a90e2',  // Cor mais viva para o título
  },
  input: {
    width: '80%',  // Caixa de digitação menor
    height: 45,    // Menor altura para os campos
    borderColor: '#ddd',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,  // Sombra suave nos campos de entrada
  },
  linksContainer: {
    width: '80%',  // Centralizando os links
    alignItems: 'center',  // Centralizando os links
    marginBottom: 24,
  },
  link: {
    color: '#4a90e2',  // Cor suave para os links
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 10,  // Espaço entre os links
  },
  loginButton: {
    width: '80%',  // Botão com a mesma largura dos campos de input
    height: 55,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,  // Sombra suave para o botão
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
