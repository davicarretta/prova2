import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { supabase } from '../supabaseClient';

type Props = {
  route: { params: { groupId: string } };
};

type Group = {
  id: string;
  nome: string;
  descricao: string;
  lider_id: string; // Exemplo adicional
};

type Member = {
  id: string;
  nome: string;
};

export default function GroupDetailsScreen({ route }: Props) {
  const { groupId } = route.params;
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroupDetails();
    fetchGroupMembers();
  }, []);

  async function fetchGroupDetails() {
    const { data, error } = await supabase
      .from('grupos')
      .select('*')
      .eq('id', groupId)
      .single();
    
    if (error) {
      console.error('Erro ao buscar detalhes do grupo:', error);
    } else {
      setGroup(data);
    }
    setLoading(false);
  }

  async function fetchGroupMembers() {
    const { data, error } = await supabase
      .from('alunos')
      .select('id, nome')
      .eq('grupo_id', groupId);
    
    if (error) {
      console.error('Erro ao buscar membros do grupo:', error);
    } else {
      setMembers(data);
    }
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1F2C73" />
      </View>
    );
  }

  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Grupo não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.nome}</Text>
      <Text style={styles.description}>{group.descricao}</Text>
      <Text style={styles.subtitle}>Membros do Grupo:</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
            <Text style={styles.member}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#1F2C73',
    textAlign: 'center'
  },
  description: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 20, 
    textAlign: 'center'
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 30, 
    marginBottom: 10, 
    textAlign: 'center',
    color: '#58608C'
  },
  memberContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  member: { 
    fontSize: 16, 
    color: '#333', 
    textAlign: 'center' 
  },
  errorMessage: { 
    fontSize: 18, 
    color: '#ff0000', 
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
