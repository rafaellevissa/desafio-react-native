import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://3.140.254.157:3000/api/v1',
  timeout: 1000,
});

const account = {
  email: 'admin@admin.com',
  password: 'admin123',
};

export async function getToken() {
  const res = await instance.post('/auth', account);
  return res.data.auth_token;
}

export async function getRemoteMarkers() {
  const token = await getToken();
  const res = await instance.get('/annotation/', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const loadedMarkers = res.data.data;
  loadedMarkers.map(marker => {
    marker.pinColor = 'red';
    marker.key = Math.random();
    marker.coordinate = {
      latitude: parseFloat(marker.lat),
      longitude: parseFloat(marker.long),
    };
  });
  const saveMarkers = JSON.stringify(loadedMarkers);
  await AsyncStorage.setItem('markers', saveMarkers);
  return loadedMarkers;
}

export async function getLocalMarkers() {
  const hasMarkers = await AsyncStorage.getItem('markers');
  if (hasMarkers != null) {
    const loadedMarkers = JSON.parse(hasMarkers);
    loadedMarkers.map(marker => {
      marker.pinColor = 'yellow';
      marker.key = Math.random();
    });
    return loadedMarkers;
  }
}

export async function updateLocal(markers) {
  const saveMarkers = JSON.stringify(markers);
  await AsyncStorage.setItem('markers', saveMarkers);
}

export async function addMarker(data) {
  try {
    const token = await getToken();
    const res = instance.post('/annotation', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAll() {
  try {
    const token = await getToken();
    const markers = await getRemoteMarkers();
    markers.map(marker => {
      instance.delete(`/annotation/${marker.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  } catch (err) {
    console.log(err);
  }
}

export async function uploadMarkers(markers) {
  try {
    const token = await getToken();
    await deleteAll();
    markers.map(marker => {
      const _data = {
        content: marker.content,
        lat: marker.coordinate.latitude,
        long: marker.coordinate.longitude,
        user_id: 1,
      };
      instance.post('/annotation', _data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  } catch (err) {
    console.log(err);
  }
}
