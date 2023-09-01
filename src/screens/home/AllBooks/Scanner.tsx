import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Colors, Fonts, Images} from '../../../constants';
import axios from 'axios';
import {ValidationModel} from '../../../components';

const Scanner = ({navigation}: any) => {
  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'Book information not found for this ISBN.',
    buttonText: 'Ok',
    isValidate: false,
  });
  const onSuccess = async (e: any) => {
    if (!e.data) return;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${e.data}`;

    try {
      axios
        .get(apiUrl)
        .then(async (response: any) => {
          let result = JSON.parse(response.request._response);
          if (result?.items) {
            return await navigation.navigate('BookDetails', {
              result: result?.items[0]?.volumeInfo,
              save: true,
            });
          } else {
            return setState(prevState => ({
              ...prevState,
              isValidate: !prevState.isValidate,
            }));
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleHideModal = () => {
    setState(prevState => ({
      ...prevState,
      isValidate: !prevState.isValidate,
    }));
  };

  return (
    <>
      <ValidationModel
        isVisible={state.isValidate}
        modalImage={state.image}
        title={state.title}
        bgColor={state.bgColor}
        description={state.description}
        onClose={handleHideModal}
        buttonText={state.buttonText}
      />
      <QRCodeScanner
        onRead={(e: any) => onSuccess(e)}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={4000}
        topContent={
          <Text style={styles.centerText}>Scan your book ISBN no</Text>
        }
      />
    </>
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