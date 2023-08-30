import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../constants';
import {
  HeaderWithSearchInput,
  LargeButton,
  TextSeemore,
} from '../../../components';

const BookDetails = ({navigation, route}: any) => {
  const {result} = route.params;
  const authors = result?.items[0]?.volumeInfo?.authors;
  console.log(authors);
  const authorsString = authors && authors.join(', ');
  const handleCloseInput = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="Book Details"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.rowContainer}>
          {result?.items[0]?.volumeInfo?.imageLinks?.smallThumbnail ? (
            <Image
              source={{
                uri: result?.items[0]?.volumeInfo?.imageLinks?.smallThumbnail,
              }}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../../assets/images/bookNotFound.png')}
              style={styles.image}
            />
          )}
          <View style={styles.titleauthorsContainer}>
            <View>
              <Text style={styles.title}>
                {result?.items[0]?.volumeInfo?.title}
              </Text>
              {result?.items[0]?.volumeInfo?.pageCount > 0 && (
                <Text style={styles.authors}>
                  {`(${result?.items[0]?.volumeInfo?.pageCount}) Pages`}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.authors}>Author:</Text>
              <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
                {authorsString || result?.items[0]?.volumeInfo.authors}
              </Text>
            </View>
            {result?.items[0]?.volumeInfo.averageRating && (
              <View>
                <Text style={styles.authors}>Ratings:</Text>
                <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
                  {`${result?.items[0]?.volumeInfo.averageRating}(${
                    result?.items[0]?.volumeInfo?.ratingsCount || 0
                  })`}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Publisher:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.items[0]?.volumeInfo?.publisher}
            </Text>
          </View>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Publish Date:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.items[0]?.volumeInfo?.publishedDate}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Maturity Level:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.items[0]?.volumeInfo?.maturityRating}
            </Text>
          </View>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Language:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.items[0]?.volumeInfo?.language.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View>
            <Text style={styles.authors}>Categories:</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {result?.items[0]?.volumeInfo?.categories && result?.items[0]?.volumeInfo?.categories.map(
              (item: any, i: number) => (
                <Text key={i} style={styles.flavorText}>
                  {item}
                </Text>
              ),
            )}
          </View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text style={styles.authors}>Description:</Text>
          <TextSeemore
            description={result?.items[0]?.volumeInfo?.description}
          />
        </View>

        <View>
          <LargeButton
            // onPress={}
            text={'Save'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    paddingHorizontal: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 200,
    marginRight: 16,
    borderRadius: 8,
  },
  titleauthorsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
  authors: {
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: 'rgba(175, 175, 175, 1)',
  },
  flavorText: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
    borderColor: 'rgba(233, 233, 255, 1)',
    borderWidth: 1,
    backgroundColor: 'background: rgba(233, 233, 255, 1)',
    borderRadius: 10,
    color: 'rgba(0, 0, 113, 1)',
  },
});
export default BookDetails;
