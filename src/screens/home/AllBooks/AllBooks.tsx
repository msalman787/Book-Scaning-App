import React, {useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  DynamicStatusBar,
  HeaderWithSearchInput,
  BookCards,
  ValidationModel,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
import {writeFile, readFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllBooks = ({navigation}: any) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const uniqueId: any = DeviceInfo.getAndroidId();
  const [bookData, setBookData] = useState<any | []>([]);
  // test phone id: 012493c7e8051e75
  // My phone id: 883a64c6f5b2c0c3
  console.log(uniqueId._j);
  const handleToggleInput = () => {
    if (isInputVisible) {
      setInputVisible(!isInputVisible);
    } else {
      setInputVisible(!isInputVisible);
    }
  };

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
    let ws = XLSX.utils.json_to_sheet(bookData);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    writeFile(DownloadDirectoryPath + '/Allbooks.xlsx', wbout, 'ascii')
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
  const filteredData =
    bookData &&
    bookData.filter((item: any) => {
      return item?.title?.toLowerCase().includes(searchText.toLowerCase());
    });
  const onSecondIconPress = async () => {
    await navigation.navigate('Scanner');
  };
  const handleHideModal = () => {
    return setIsModelVisible(false);
  };

  const getData = async () => {
    const getBookData: any = await AsyncStorage.getItem('books');
    const existingDataArray = JSON.parse(getBookData);

    setBookData(existingDataArray);
  };

  useEffect(() => {
    console.log('hello');
    getData();
  }, []);

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
        {filteredData?.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={({item}) => {
              return (
                <BookCards
                  title={item.title}
                  authors={item.authors}
                  image={item.image}
                  publisher={item.publisher}
                  publishedDate={item.publishedDate}
                  item={item}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={{alignItems: 'center'}}>
            <View style={{height:"50%"}}/>
            <Text
              style={{
                fontFamily: Fonts.POPPINS_SEMI_BOLD,
                fontSize: 25,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              No Books Found
            </Text>
          </View>
        )}
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
