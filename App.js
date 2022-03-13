import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import react, { useState} from 'react';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContacts(data)
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        keyExtractor={ (item, index) => index }
        renderItem={({item}) => 
        <Text>{item.name} {item.phoneNumbers[0].number}</Text>}
        />
      <Button title= "Get contacts" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
});
