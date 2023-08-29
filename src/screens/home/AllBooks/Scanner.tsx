import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
import { Colors, Fonts } from '../../../constants';

const Scanner = ({navigation}: any) => {

  const onSuccess = async (e: any) => {
    try {
      if (e.data) {

        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <QRCodeScanner
      onRead={(e: any) => onSuccess(e)}
      showMarker={true}
      // reactivate={true}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Scan your book ISBN no 
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 22,
    padding: 32,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontWeight: 'bold',
    color: Colors.DEFAULT_BLACK,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
export default Scanner;
