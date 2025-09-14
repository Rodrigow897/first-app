import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([
    {id: '', label: ''},
  ]);

  return (
   <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text>Home Page</Text>
      <TextInput value={value} onChangeText={setValue} style={styles.input} />
      <TouchableOpacity onPress={()=>{
        setList([...list, {id: String(list.length + 1), label: value}]);
        setValue('');
      }} style={styles.button}><Text style={{color: 'white'}}>Adicionar</Text></TouchableOpacity>

      {list.map((item) => (
        <Text key={item.id}>{item.label}</Text>
      ))}
    </SafeAreaView>
   </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  button: { marginTop: 10, padding: 10, backgroundColor: '#f749faff', borderRadius: 8 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 10, width: '50%', borderRadius: 8 },
})