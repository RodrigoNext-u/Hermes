import { StyleSheet } from 'react-native';

export const ScannerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scanBorder: {
    width: 300,
    height: 300,
    borderColor: 'gold',
    borderWidth: 2,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  componentDetailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  componentImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 25,
  },
});

export const GlobalStockScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#303030',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#000E3D',
    borderRadius: 40,
  },
  text: {
    color: 'gold'
  },
  button: {
    marginBottom: 40,
    marginTop: 10,
    backgroundColor: '#000E3D',
    padding: 10,
    borderRadius: 5,
  },  
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goldText: {
    color: 'gold',
  },
});

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#000E3D',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goldText: {
    color: 'gold',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom : 80,
    resizeMode: 'contain',
    borderRadius: 45,
  },
  qrCodeContainer: {
    marginTop: 20,
  },
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