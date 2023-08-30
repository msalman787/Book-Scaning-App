import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  DynamicStatusBar,
  HeaderWithSearchInput,
  BookCards,
} from '../../../components';
import {Colors, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
const AllBooks = ({navigation}: any) => {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleToggleInput = () => {
    if (isInputVisible) {
      setInputVisible(!isInputVisible);
    } else {
      setInputVisible(!isInputVisible);
    }
  };
  const data = [
    {
      id: '1',
      image: Images.StoreImg,
      title: 'Goodnight, Goodnight Construction Site',
      authors: 'Sherri Duskey Rinker',
      publisher: 'Chronicle Books Llc',
      publishedDate: '2011-05-04',
    },
    {
      id: '2',
      image: Images.StoreImg,
      title: 'Zero To One',
      authors: 'Sherri Duskey Rinker',
      publisher: 'Chronicle Books Llc',
      publishedDate: '2011-05-04',
    },
    {
      id: '3',
      image: Images.StoreImg,
      title: 'Goodnight, Goodnight Construction Site',
      authors: 'Sherri Duskey Rinker',
      publisher: 'Chronicle Books Llc',
      publishedDate: '2011-05-04',
    },
    {
      id: '4',
      image: Images.StoreImg,
      title: 'Zero To One',
      authors: 'Sherri Duskey Rinker',
      publisher: 'Chronicle Books Llc',
      publishedDate: '2011-05-04',
    },
    {
      id: '5',
      image: Images.StoreImg,
      title: 'Goodnight, Goodnight Construction Site',
      authors: 'Sherri Duskey Rinker',
      publisher: 'Chronicle Books Llc',
      publishedDate: '2011-05-04',
    },
    {
      id: '6',
      image: Images.StoreImg,
      title: 'Zero To One',
      authors: 'Sherri Duskey Rinker',
      publisher: 'Chronicle Books Llc',
      publishedDate: '2011-05-04',
    },
    {
      id: '7',
      image: Images.StoreImg,
      title: 'Goodnight, Goodnight Construction Site',
      authors: 'Sherri Duskey Rinker',
      publisher: 'Chronicle Books Llc',
      publishedDate: '2011-05-04',
    },
  ];
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (text: any) => {
    setSearchText(text);
  };
  const filteredData = data.filter((item: any) =>
    item?.title?.toLowerCase().includes(searchText.toLowerCase()),
  );
  const onSecondIconPress = async () => {
    await navigation.navigate('Scanner');
  };

  const renderCardRow = ({item}: any) => (
    <BookCards
      title={item.title}
      authors={item.authors}
      image={item.image}
      publisher={item.publisher}
      publishedDate={item.publishedDate}
    />
  );

  return (
    <View style={styles.container}>
      <DynamicStatusBar />

      <View style={styles.header}>
        <HeaderWithSearchInput
          onSecondIconPress={onSecondIconPress}
          image={Images.Search}
          secondIcon={Images.Barcode}
          onIconPress={handleToggleInput}
          searchText={searchText}
          isInputVisible={isInputVisible}
          onSearchTextChange={handleSearchTextChange}
          title="All Books"
          showIcon={true}
          titleStyle={-100}
        />
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={filteredData}
          renderItem={renderCardRow}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  cardsContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
    paddingBottom: 75,
  },
});

export default AllBooks;
