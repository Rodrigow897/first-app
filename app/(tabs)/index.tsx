import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([
    {id: '', label: '',},
  ]);

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
        setList([...list, {id: String(list.length + 1), label: value}]);
        setValue('');
      }} style={styles.button}><Text style={{color: 'white'}}>Adicionar</Text></TouchableOpacity>

      {list.map((item) => (
        <Text key={item.id}>{item.id}.{item.label}</Text>
      ))}
    </SafeAreaView>
   </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  button: { marginTop: 10, padding: 10, backgroundColor: '#4e54fdbe', borderRadius: 8 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 10, width: '50%', borderRadius: 8 },
})