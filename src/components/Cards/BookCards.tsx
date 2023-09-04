import React, {useState} from 'react';
import {
  View,
  Button,
  Linking,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
// import Share from 'react-native-share';

import {Colors, Fonts, Images} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const BookCards = ({title, authors, publisher, publishedDate, item}: any) => {
  const navigation: any = useNavigation();

  const onShare = async (title: any, authors: string, image: any) => {
    const sharedContent: any = `Book title: ${title}\n Authors: ${authors ? authors : "" }\n\n${image ? image : ""}`;

    try {
      const result = await Share.share({
        message: sharedContent,
      });
      if (result.action === Share.sharedAction) {
        // Content was successfully shared
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed
      }
    } catch (error: any) {
      console.error('Error sharing content:', error.message);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // console.log({item});
        navigation.navigate('BookDetails', {
          result: item,
          save: false,
        });
      }}>
      <View style={styles.rowContainer}>
        {item?.image ? (
          <Image
            source={{
              uri: item?.image,
            }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require('../../assets/images/bookNotFound.png')}
            style={styles.image}
          />
        )}
        <View style={styles.titleauthorsContainer}>
          <Text style={styles.title}>Title: {title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.authors}>Author: {authors}</Text>
          </View>
          <Text
            style={[
              styles.title,
              {fontSize: 12, color: 'rgba(105, 119, 132, 1)'},
            ]}>
            Published date: {publishedDate ? publishedDate : 'Not Defined'}
          </Text>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View style={styles.rowContainer}>
        <Text style={styles.publisher}>Publisher: {publisher}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onShare(title, authors, item?.image);
          }}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 15,
    padding: 16,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
  },
  titleauthorsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  icon: {
    marginRight: 3,
  },
  authors: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'rgba(105, 119, 132, 1)',
  },
  horizontalBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    marginVertical: 10,
  },
  publisher: {
    flex: 1,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'rgba(105, 119, 132, 1)',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.DEFAULT_BLACK,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 12,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});

export default BookCards;
