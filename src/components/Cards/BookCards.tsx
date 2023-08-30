import React, {useState} from 'react';
import {
  View,
  Button,
  Linking,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Fonts, Images} from '../../constants';

const BookCards = ({title, authors, publisher, publishedDate}: any) => {

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <Image
          source={{uri: 'http://books.google.com/books/content?id=latAngEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}}
          style={styles.image}
        />
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
            Published date: {publishedDate}
          </Text>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View style={styles.rowContainer}>
        <Text style={styles.publisher}>Publisher: {publisher}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 8,
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
    height: 120,
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
