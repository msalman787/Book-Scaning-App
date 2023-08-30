import React, {useState} from 'react';
import {
  FlatList,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DynamicStatusBar,
  HeaderWithSearchInput,
  BookCards,
  ValidationModel,
} from '../../../components';
import {Colors, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
import {writeFile, readFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';

const AllBooks = ({navigation}: any) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [state, setState] = useState({
    isValidate: false,
  });

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

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
            message: 'hello world',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportDataToExcel();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  const exportDataToExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    writeFile(DownloadDirectoryPath + '/Albook.xlsx', wbout, 'ascii')
      .then(async r => {
        console.log('Success');
        return setIsModelVisible(true);
      })
      .catch(e => {
        console.log('Error', e);
      });
  };

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
  const handleHideModal = () => {
    return setIsModelVisible(false);
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
      <ValidationModel
        isVisible={isModelVisible}
        modalImage={Images.SucessIcon}
        title={'Success'}
        bgColor={'rgba(41, 172, 68, 1)'}
        description={"All book's downloaded successfully."}
        onClose={handleHideModal}
        buttonText={'Ok'}
      />
      <View style={styles.header}>
        <HeaderWithSearchInput
          onSecondIconPress={onSecondIconPress}
          onThirdIconPress={handleClick}
          image={Images.Search}
          secondIcon={Images.Barcode}
          thirdIcon={Images.Download}
          onIconPress={handleToggleInput}
          searchText={searchText}
          isInputVisible={isInputVisible}
          onSearchTextChange={handleSearchTextChange}
          title="All Books"
          showIcon={true}
          titleStyle={90}
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
