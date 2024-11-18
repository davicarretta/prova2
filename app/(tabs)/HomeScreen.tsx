import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { supabase } from '../supabaseClient';

type Grupo = {
  id: string;
  nome: string;
  descricao: string;
};

export default function HomeScreen({ navigation }: any) {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    const { data, error } = await supabase.from('grupos').select('*');
    if (error) {
      console.error('Erro ao buscar grupos:', error);
    } else {
      setGrupos(data);
    }
  }

  const renderGroup = ({ item }: { item: Grupo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
      style={styles.card}
    >
      <Text style={styles.groupName}>{item.nome}</Text>
      <Text style={styles.groupDescription}>{item.descricao}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Grupos Disponíveis</Text>
      <FlatList
        data={grupos}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1F2C73',
  },
  list: {
    width: '100%',
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#1F2C73',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  groupDescription: {
    fontSize: 14,
    color: '#D0D0D0',
    marginTop: 6,
  },
});
