import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeModal from './composants/QRCodeModal';
import { HomeScreenStyles } from './ScreenStyles';
import CustomStatusBar from './composants/CustomStatusBar';

const HomeScreen = ({ navigation }) => {
  const [qrData, setQrData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    return () => {
      setQrData('');
    };
  }, []);

  const handlePressScan = () => {
    navigation.navigate('QRCodeScanner');
  };

  const handlePressStock = () => {
    navigation.navigate('ComponentStockScreen');
  };

  const handlePressStocks = () => {
    navigation.navigate('GlobalStockScreen');
  };

  const handlePressCommande = () => {
    navigation.navigate('CommandeScreen');
  };

  const handleGenerateQRCode = () => {
    setQrData(textInput);
    setModalVisible(false);
  };

  return (
    <CustomStatusBar statusBgColor="#505050">
    <View style={HomeScreenStyles.container}>
      <Image source={require('./Icon.jpg')} style={HomeScreenStyles.logo} />
      <TouchableOpacity style={HomeScreenStyles.button} onPress={handlePressScan}>
        <Text style={[HomeScreenStyles.buttonText, HomeScreenStyles.goldText]}>Scanner Composant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={HomeScreenStyles.button} onPress={handlePressStock}>
        <Text style={[HomeScreenStyles.buttonText, HomeScreenStyles.goldText]}>Stock d'un composant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={HomeScreenStyles.button} onPress={handlePressStocks}>
        <Text style={[HomeScreenStyles.buttonText, HomeScreenStyles.goldText]}>Stocks globaux</Text>
      </TouchableOpacity>
      <TouchableOpacity style={HomeScreenStyles.button} onPress={handlePressCommande}>
        <Text style={[HomeScreenStyles.buttonText, HomeScreenStyles.goldText]}>Scan Commande</Text>
      </TouchableOpacity>
      <TouchableOpacity style={HomeScreenStyles.button} onPress={() => setModalVisible(true)}>
        <Text style={[HomeScreenStyles.buttonText, HomeScreenStyles.goldText]}>Générer QR Code</Text>
      </TouchableOpacity>

      <QRCodeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleGenerateQRCode={handleGenerateQRCode}
      />

      {qrData ? (
        <View style={HomeScreenStyles.qrCodeContainer}>
          <QRCode value={qrData} size={200} />
        </View>
      ) : null}
    </View></CustomStatusBar>
  );
};

export default HomeScreen;
