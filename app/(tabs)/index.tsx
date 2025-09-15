import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [value, setValue] = useState('');
  type TodoItem = { id: string; label: string; complete: boolean };
  const [list, setList] = useState<TodoItem[]>([]);

  const handleAdd = () => {
    if (value.trim() === '') return;
    setList([...list, { id: String(list.length + 1), label: value, complete: false }]);
    setValue('');
  };

  const handleDelete = (id: string) => {
    setList(list.filter(item => item.id !== id));
  };

  const handleComplete = (id: string) => {
    setList(list.map(item => 
      item.id === id ? { ...item, complete: !item.complete } : item
    ));
  };

  return (
   <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: '#3037f8d8', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 20}}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Meu primeiro App</Text> 
          </View>
      <Text>Digite algo para adicionar</Text>
      <TextInput value={value} onChangeText={setValue} style={styles.input} />
      <TouchableOpacity onPress={()=>{
        setList([...list, {id: String(list.length + 1 +'. '), label: value, complete: false}]);
        setValue('');
      }} style={styles.button}><Text style={{color: 'white'}}>Adicionar</Text></TouchableOpacity>

      <FlatList style={styles.tarefasBox}
          ListHeaderComponent={<Text style={styles.tarefasHeader}>Tarefas</Text>}
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              {/* Botão de concluir à esquerda */}
              <TouchableOpacity
                onPress={() => handleComplete(item.id)}
                style={styles.completeBtn}
              >
                <Text style={{ color: 'white' }}>
                  {item.complete ? '✓' : 'Concluir'}
                </Text>
              </TouchableOpacity>

              {/* Texto da tarefa */}
              <Text style={[
                styles.itemText,
                item.complete && styles.completedText
              ]}>
                {item.id}. {item.label}
              </Text>

              {/* Botão de excluir à direita */}
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteBtn}
              >
                <Text style={{ color: 'white' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
    </SafeAreaView>
   </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  header: { backgroundColor: '#3037f8d8', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 20 },
  headerText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  button: { marginTop: 10, padding: 10, backgroundColor: '#4e54fdbe', borderRadius: 8 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 10, width: '50%', borderRadius: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: '100%', justifyContent: 'space-between' },
  itemText: { flex: 1, textAlign: 'center'},
  completedText: { textDecorationLine: 'line-through', color: 'gray' },
  completeBtn: { backgroundColor: 'green', padding: 6, borderRadius: 6, marginRight: 8 },
  deleteBtn: { backgroundColor: 'red', padding: 6, borderRadius: 6, marginLeft: 8 },
  tarefasBox: { marginTop: 20, width: '90%' },
  tarefasHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});