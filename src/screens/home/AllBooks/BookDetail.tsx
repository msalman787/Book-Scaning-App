import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Images} from '../../../constants';
import {
  HeaderWithSearchInput,
  LargeButton,
  TextSeemore,
  ValidationModel,
} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookDetails = ({navigation, route}: any) => {
  const {result} = route.params;
  const {save} = route.params;
  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'This book already exist.',
    buttonText: 'Ok',
    isValidate: false,
  });

  const authors = result?.authors;
  const authorsString = authors && authors.join(', ');
  let timeStamp = new Date().toISOString();

  const data = [
    {
      image: result?.imageLinks?.smallThumbnail,
      title: result?.title,
      authors: authorsString,
      publisher: result?.publisher,
      publishedDate: result?.publishedDate,
      categories: result?.categories,
      language: result?.language,
      maturityLevel: result?.maturityRating,
      averageRating: result?.averageRating,
      ratingsCount: result?.ratingsCount,
      pageCount: result?.pageCount,
      description: result?.description,
      addedOn:timeStamp
    },
  ];
  const handleCloseInput = () => {
    navigation.goBack();
  };
  const handleHideModal = () => {
    navigation.replace('AllBooks');
    setState(prevState => ({
      ...prevState,
      isValidate: !prevState.isValidate,
    }));
  };

  const saveData = async () => {
    const newData = {
      image: result?.imageLinks?.smallThumbnail,
      title: result?.title,
      authors: authorsString,
      publisher: result?.publisher,
      publishedDate: result?.publishedDate,
      categories: result?.categories,
      language: result?.language,
      maturityLevel: result?.maturityRating,
      averageRating: result?.averageRating,
      ratingsCount: result?.ratingsCount,
      pageCount: result?.pageCount,
      description: result?.description,
      addedOn:timeStamp
    };

    const getBookData: any = await AsyncStorage.getItem('books');

    const existingDataArray = getBookData ? JSON.parse(getBookData) : [];

    if (existingDataArray.length > 0) {
      const filteredTitles = existingDataArray.filter(
        (item: any) => item.title === result?.title,
      );
      if (filteredTitles.length > 0) {
        setState(prevState => ({
          ...prevState,
          isValidate: !prevState.isValidate,
        }));
        return;
      }
      // // existingDataArray.authors
      existingDataArray.unshift(newData);
      const updatedDataJson = JSON.stringify(existingDataArray);
      await AsyncStorage.setItem('books', updatedDataJson);
    } else {
      const bookDataToString: any = await JSON.stringify(data);
      await AsyncStorage.setItem('books', bookDataToString);
    }
    navigation.replace('AllBooks');
  };
  return (
    <ScrollView style={styles.container}>
      <ValidationModel
        isVisible={state.isValidate}
        modalImage={state.image}
        title={state.title}
        bgColor={state.bgColor}
        description={state.description}
        onClose={handleHideModal}
        buttonText={state.buttonText}
      />
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="Book Details"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.rowContainer}>
          {result?.imageLinks?.smallThumbnail || result.image ? (
            <Image
              source={{
                uri: result?.imageLinks?.smallThumbnail || result.image,
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
              <Text style={styles.title}>{result?.title}</Text>
              {result?.pageCount > 0 && (
                <Text style={styles.authors}>
                  {`${result?.pageCount} Pages`}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.authors}>Author:</Text>
              <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
                {authorsString || result?.authors}
              </Text>
            </View>
            {result?.averageRating && (
              <View>
                <Text style={styles.authors}>Ratings:</Text>
                <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
                  {`${result?.averageRating}(${result?.ratingsCount})`}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Publisher:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.publisher}
            </Text>
          </View>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Publish Date:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.publishedDate ? result?.publishedDate : 'Not Defined'}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Maturity Level:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.maturityRating  || result?.maturityRating }
            </Text>
          </View>
          <View style={styles.titleauthorsContainer}>
            <Text style={styles.authors}>Language:</Text>
            <Text style={[styles.authors, {color: Colors.DEFAULT_BLACK}]}>
              {result?.language}
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
            {result?.categories &&
              result?.categories.map((item: any, i: number) => (
                <Text key={i} style={styles.flavorText}>
                  {item}
                </Text>
              ))}
          </View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text style={styles.authors}>Description:</Text>
          <TextSeemore description={result?.description} />
        </View>

        {save && (
          <View>
            <LargeButton onPress={saveData} text={'Save'} />
          </View>
        )}
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