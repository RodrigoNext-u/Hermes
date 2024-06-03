import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { GlobalStockScreenStyle, ScannerStyles } from '../ScreenStyles';
import getUrl from '../UrlApi.js';
  

const url = getUrl();

const StockStatusScreen = ({ navigation }) => {
  const [stockData, setStockData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(`${url}/src/API/API.php/stocks`);
      setStockData(response.data);
      
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setRefreshing(false); // Make sure to set refreshing to false when the data fetching is completed
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStockData();
  };

  const renderItem = ({ item }) => (
    <View style={[GlobalStockScreenStyle.item]}>
      <Text style={[GlobalStockScreenStyle.text]}>Type: {item.type}</Text>
      <Text style={[GlobalStockScreenStyle.text]}>QR Code: {item.qrCode}</Text>
      <Text style={[GlobalStockScreenStyle.text]}>Quantité Actuel: {item.qteReel}</Text>
      <Text style={[GlobalStockScreenStyle.text]}>Quantité Minimale: {item.qteMin}</Text>
      <Image source={{ uri: `${url}/src/ImageComposant/${item.type}/${item.qrCode}.jpg` }}
        style={ScannerStyles.componentImage} alt={item.qrCode}/>
    </View>
    
  );

  const handleCCButtonPress = () => {
    navigation.navigate('ComponentStockScreen');
  };

  return (
    <View style={GlobalStockScreenStyle.container}>
      <TouchableOpacity style={GlobalStockScreenStyle.button} onPress={handleCCButtonPress}>
        <Text style={[GlobalStockScreenStyle.buttonText, GlobalStockScreenStyle.goldText]}>Scan QR Code </Text>
      </TouchableOpacity>

      <FlatList
        data={stockData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default StockStatusScreen;
