import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { ScannerStyles } from '../ScreenStyles'; // Importez le module styles

const CommandeScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [components, setComponents] = useState([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [lockScanner, setLockScanner] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const fetchData = async (qrCode) => {
    try {
      const response = await axios.get(`http://192.168.0.19/projet%20v2/projet-x/src/API/API.php/commande/` + qrCode);
      setComponents(response.data);
      setCurrentComponentIndex(0);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching component details:', error);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned && !modalVisible && !lockScanner) { 
      setScanned(true);
      setQrData(data);
      fetchData(data);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setScanned(false);
    setQrData('');
    setLockScanner(true); 
    setTimeout(() => {
      setLockScanner(false); 
    }, 3000);
  };

  const navigateComponents = (direction) => {
    if (direction === 'next') {
      setCurrentComponentIndex((prevIndex) => (prevIndex === components.length - 1 ? 0 : prevIndex + 1));
    } else {
      setCurrentComponentIndex((prevIndex) => (prevIndex === 0 ? components.length - 1 : prevIndex - 1));
    }
  };

  const renderComponentDetails = () => {
    const component = components[currentComponentIndex];
    if (component.idComposant !== null) {
      return (
        <View style={ScannerStyles.componentDetailsContainer}>
          <Text>Type: {component.type}</Text>
          <Text>Marque: {component.marque}</Text>
          <Text>Libellé: {component.libelle}</Text>
          <Text>Prix: {component.prix}</Text>
          <Text>Quantite: {component.quantite}</Text>
          <Text>Statut: {component.statut}</Text>
          <Text>QR Code: {qrData}</Text>
          <Image
            source={{ uri: `http://192.168.0.19/projet%20v2/projet-x/src/ImageComposant/${component.type}/${component.qrCode}.jpg` }}
            style={ScannerStyles.componentImage}
            alt={component.qrCode}
          />
        </View>
      );
    } else if (component.idServices !== null) {
      return (
        <View style={ScannerStyles.componentDetailsContainer}>
          <Text>Libellé: {component.libelleService}</Text>
          <Text>Description: {component.descr}</Text>
          <Text>Quantite: {component.quantite}</Text>
          <Text>Statut: {component.statut}</Text>
          <Image
            source={{ uri: `http://192.168.0.19/projet%20v2/projet-x/src/ImageService/${component.libelleService}.jpg` }}
            style={ScannerStyles.componentImage}
            alt={component.libelleService}
            borderRadius={45}
          />
        </View>
      );
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={cameraRef}
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        <View style={ScannerStyles.overlay}>
          <View style={ScannerStyles.scanBorder} />
        </View>
      </Camera>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={ScannerStyles.modalContainer}>
          {components.length > 0 && (
            <>
              {renderComponentDetails()}
              <View style={styles.navigationButtons}>
                <TouchableOpacity onPress={() => navigateComponents('prev')}>
                  <Text style={styles.navigationText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateComponents('next')}>
                  <Text style={styles.navigationText}>→</Text>
                </TouchableOpacity>
              </View>
              <Button title="Fermer" onPress={handleCloseModal} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  navigationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gold',
  },
});

export default CommandeScreen;
