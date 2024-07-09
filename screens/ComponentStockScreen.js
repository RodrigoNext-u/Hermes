import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { ScannerStyles } from '../ScreenStyles'; // Importez le module styles
import geturl from '../UrlApi'

const url = geturl();

const ComponentStockScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [componentDetails, setComponentDetails] = useState(null);
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
      const response = await axios.get(url + `/src/API/API.php/stock/`+qrCode);
      setComponentDetails(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching component details:', error);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned && !modalVisible && !lockScanner) { // Vérifiez si le scanner n'est pas verrouillé
      setScanned(true);
      setQrData(data);
      fetchData(data);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setScanned(false);
    setQrData('');
    setLockScanner(true); // Activer le verrouillage du scanner lorsque le modal est fermé
    setTimeout(() => {
      setLockScanner(false); // Désactiver le verrouillage après 6 secondes
    }, 3000);
  };

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
          {componentDetails && (
            <View style={ScannerStyles.componentDetailsContainer}>
              <Text>Type: {componentDetails[0].type}</Text>
              <Text>Marque: {componentDetails[0].marque}</Text>
              <Text>Libellé: {componentDetails[0].libelle}</Text>
              <Text>Prix: {componentDetails[0].prix}</Text>
              <Text>QR Code: {qrData}</Text>
              <Text>Quantité actuel: {componentDetails[0].qteReel}</Text>
              <Text>Quantité minimum: {componentDetails[0].qteMin}</Text>
              <Text>Quantité maximum: {componentDetails[0].qteMax}</Text>
              <Text>Seuil d'alerte: {componentDetails[0].qteAlerte}</Text>
              <Image
                source={{ uri: url +`/src/ImageComposant/${componentDetails[0].type}/${componentDetails[0].qrCode}.jpg` }}
                style={ScannerStyles.componentImage}
                alt={componentDetails[0].qrCode}
              />
              <Button title="Fermer" onPress={handleCloseModal} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ComponentStockScreen;
