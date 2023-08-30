import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {horizontalScale, verticalScale} from '../../utils/Dimentions';
import LargeButton from '../Buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';

const Model = ({
  isVisible,
  onClose,
  title,
  description,
  buttonText,
  modalImage,
  onPageRedirect,
}: any) => {
  // const ModalImage = modalImage;
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}>
            <Image
              source={{
                uri: modalImage,
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity style={{height: 50, width: 320}}>
              <LargeButton
                onPress={onPageRedirect || onClose}
                text={buttonText}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    paddingVertical:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.DEFAULT_WHITE,
    marginHorizontal: horizontalScale(10),
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 250,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.LIGHT_GRAY,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Model;
