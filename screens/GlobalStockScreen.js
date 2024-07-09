import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GlobalStockScreenStyle } from '../ScreenStyles';
import geturl from '../UrlApi'

const url = geturl();
const StockStatusScreen = ({ navigation }) => {
  const [stockData, setStockData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(url +'/src/API/API.php/stocks');
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
      <Text style={[GlobalStockScreenStyle.text]}>Quantité Réelle: {item.qteReel}</Text>
      <Text style={[GlobalStockScreenStyle.text]}>Quantité Minimale: {item.qteMin}</Text>
    </View>
  );

  const handleCCButtonPress = () => {
    navigation.navigate('ComponentStockScreen'); // Navigate to ComponentStockScreen
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
