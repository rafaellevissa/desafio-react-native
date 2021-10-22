import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLocalMarkers, getRemoteMarkers, updateLocal } from '../src/functions';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from 'react-native';

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [coordinate, setCoordinate] = useState({});
  const [text, setText] = useState('');
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    async function getMarkers() {
      const loadedMarkers = await getLocalMarkers();
      if (loadedMarkers.length !== 0) {
        setMarkers(loadedMarkers);
      } else {
        try {
          const loadedMarkers = await getRemoteMarkers();
          setMarkers(loadedMarkers);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getMarkers();
  }, []);

  async function updateMap() {
    const loadedMarkers = await getRemoteMarkers();
    setMarkers(loadedMarkers);
  }

  function showModal(e) {
    setCoordinate(e.nativeEvent.coordinate);
    setIsPromptVisible(true);
  }

  async function addMarker() {
    const updatedMarkers = [
      ...markers,
      {
        content: text,
        coordinate: coordinate,
        key: `${Math.random()}`,
        pinColor: 'yellow',
      },
    ];
    setMarkers(updatedMarkers);
    await updateLocal(updatedMarkers);
    setIsPromptVisible(false);
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onPress={e => showModal(e)}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {markers &&
            markers.map(marker => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                pinColor={marker.pinColor}>
                <Callout style={styles.plainView}>
                  <View>
                    <Text>{marker.content}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
        {isPromptVisible && (
          <View>
            <Modal isVisible={isPromptVisible}>
              <View style={styles.modal}>
                <TextInput
                  style={styles.input}
                  placeholder="Insira sua mensagem:"
                  placeholderTextColor="#FFF"
                  value={text}
                  onChangeText={setText}
                />
                <View style={styles.modalButtons}>
                  <Button
                    onPress={() => setIsPromptVisible(false)}
                    title="Cancelar"
                  />
                  <Button onPress={() => addMarker()} title="Salvar" />
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View style={styles.sync}>
          <Icon.Button
            name="refresh"
            backgroundColor="#3b5998"
            onPress={() => updateMap()}>
            Atualizar
          </Icon.Button>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sync: {
    flex: 1,
    flexDirection: 'column-reverse',
    marginLeft: 'auto',
    marginRight: 20,
    marginBottom: 20,
  },
  modalText: {
    color: '#FFF',
  },
  modalButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'grey',
    borderRadius: 20,
  },
});

export default Map;
