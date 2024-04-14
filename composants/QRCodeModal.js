// QRCodeModal.js

import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const QRCodeModal = ({ modalVisible, setModalVisible, handleGenerateQRCode }) => {
  const [textInput, setTextInput] = useState('');

  return (
    <Modal
    
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Entrez le texte pour le QR Code :</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setTextInput(text)}
            value={textInput}
          />
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateQRCode}
          >
            <Text style={styles.generateButtonText}>Générer QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  generateButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QRCodeModal;
