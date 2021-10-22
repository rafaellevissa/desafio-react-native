import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

import {
  getLocalMarkers,
  getRemoteMarkers,
  addMarker,
  uploadMarkers,
} from '../src/functions';

const Notes = () => {
  const [text, setText] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [markers, setMarkers] = useState([]);

  const data = {
    content: text,
    lat: lat,
    long: long,
    user_id: 1,
  };

  async function downloadMarkers() {
    const res = await getRemoteMarkers();
    setMarkers(res);
  }

  async function storeMarker(data) {
    await addMarker(data);
    await downloadMarkers();
  }

  async function updateNotes() {
    const loadedMarkers = await getLocalMarkers();
    setMarkers(loadedMarkers);
  }

  useEffect(() => {
    async function getMarkers() {
      try {
        const loadedMarkers = await getLocalMarkers();
        setMarkers(loadedMarkers);
      } catch {
        const loadedMarkers = await getRemoteMarkers();
        setMarkers(loadedMarkers);
      }
    }
    getMarkers();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Texto"
          onChangeText={setText}
          value={text}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          onChangeText={setLat}
          value={lat}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          onChangeText={setLong}
          value={long}
        />
        <Button
          onPress={() => storeMarker(data)}
          style={styles.button}
          title="Add"
        />
      </View>
      <View style={styles.list}>
        {markers && (
          <FlatList
            data={markers}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Text>{item.content}</Text>
                <Text>{item.coordinate.latitude.toFixed(4)}</Text>
                <Text>{item.coordinate.longitude.toFixed(4)}</Text>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.sync}>
        <Icon.Button
          name="refresh"
          backgroundColor="#3b5998"
          onPress={() => updateNotes()}>
          Atualizar
        </Icon.Button>
        <Icon.Button
          name="cloud-download"
          backgroundColor="#3b5998"
          onPress={() => downloadMarkers()}>
          Baixar
        </Icon.Button>
        <Icon.Button
          style={styles.syncButton}
          name="cloud-upload"
          backgroundColor="#3b5998"
          onPress={() => uploadMarkers(markers)}>
          Salvar
        </Icon.Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    width: 100,
    borderWidth: 2,
    borderRadius: 6,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  list: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sync: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Notes;
