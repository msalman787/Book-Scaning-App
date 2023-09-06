import React, {useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  View,
  Platform,
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
import {
  writeFile,
  readFile,
  DownloadDirectoryPath,
  ExternalStorageDirectoryPath,
  mkdir,
} from 'react-native-fs';
import XLSX from 'xlsx';
// import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllBooks = ({navigation}: any) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  // const uniqueId: any = DeviceInfo.getAndroidId();
  const [bookData, setBookData] = useState<any | []>([]);
  // test phone id: 012493c7e8051e75
  // My phone id: 883a64c6f5b2c0c3
  // console.log(uniqueId._j);
  const handleToggleInput = () => {
    if (isInputVisible) {
      setInputVisible(!isInputVisible);
    } else {
      setInputVisible(!isInputVisible);
    }
  };

  const handleClick = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permission Required',
            buttonNeutral: 'Remind Me Later',
            buttonNegative: 'Deny',
            buttonPositive: 'Allow',
            message:
              'To provide the best experience, we need access to your storage.',
          },
        );

        if (!granted) {
          return false;
        }
      }

      if (Platform.OS === 'android') {
        return exportDataToExcel(Platform.Version);
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  const exportDataToExcel = async (androidVersion: number = 29) => {
    const exportData = await bookData?.map((item: any) => {
      const categoriesString = Array.isArray(item?.categories)
        ? item?.categories.join(', ')
        : item?.categories;
      const authorsString = Array.isArray(item?.authors)
        ? item?.authors.join(', ')
        : item?.authors;
      return {
        isbn: item?.isbn,
        image: item?.image,
        title: item?.title,
        authors: authorsString,
        publisher: item?.publisher,
        publishedDate: item?.publishedDate,
        categories: categoriesString,
        language: item?.language,
        maturityLevel: item?.maturityLevel,
        averageRating: item?.averageRating,
        ratingsCount: item?.ratingsCount,
        pageCount: item?.pageCount,
        description: item?.description,
        addedOn: item?.addedOn,
      };
    });
    if (exportData) {
      try {
        const DownloadDirectoryPath =
          androidVersion >= 30
            ? `${ExternalStorageDirectoryPath}/Download/PawBookFinder`
            : `${ExternalStorageDirectoryPath}/PawBookFinder`;

        // Create the directory if it doesn't exist
        console.log({DownloadDirectoryPath});
        await mkdir(DownloadDirectoryPath);
        // Create a new Excel workbook and add a worksheet with your data
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'All Books');

        // Write the Excel workbook to a binary format
        const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

        // Define the file path for the Excel file
        const excelFilePath = `${DownloadDirectoryPath}/Allbooks_${new Date().getTime()}.xlsx`;

        // Write the binary Excel data to the file
        await writeFile(excelFilePath, wbout, 'ascii');

        console.log('Excel file saved successfully at:', excelFilePath);
        setIsModelVisible(true);
        return 'Success';
      } catch (error) {
        console.error('Error:', error);
        return 'Error';
      }
    }
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
    await getData();
    return await navigation.navigate('Scanner');
  };
  const handleHideModal = () => {
    return setIsModelVisible(false);
  };

  const getData = async () => {
    const getBookData: any = await AsyncStorage.getItem('books');
    const existingDataArray = JSON.parse(getBookData);

    setBookData(existingDataArray);
  };
  // let localArray: any = [
  //   {
  //     addedOn: '2023-09-04T12:06:41.406Z',
  //     authors: 'Asad Mughal',
  //     averageRating: 5,
  //     categories: ['Self-Help', 'Public', 'Human'],
  //     description:
  //       'OWN YOUR MORNING, ELEVATE YOUR LIFE Legendary leadership and elite performance expert Robin Sharma introduced The 5 AM Club concept over twenty years ago, based on a revolutionary morning routine that has helped his clients maximize their productivity, activate their best health and bulletproof their serenity in this age of overwhelming complexity. Now, in this life-changing book, handcrafted by the author over a rigorous four year period, you will discover the early-rising habit that has helped so many accomplish epic results while upgrading their happiness, helpfulness and feelings of aliveness. Through an enchanting—and often amusing—story about two struggling strangers who meet an eccentric tycoon who becomes their secret mentor, The 5 AM Club will walk you through: ■ How great geniuses, business titans and the world’s wisest people start their mornings to produce astonishing achievements ■ A little-known formula you can use instantly to wake up early feeling inspired, focused and flooded with a fiery drive to get the most out of each day ■ A step-by-step method to protect the quietest hours of daybreak so you have time for exercise, self-renewal and personal growth ■ A neuroscience-based practice proven to help make it easy to rise while most people are sleeping, giving you precious time for yourself to think, express your creativity and begin the day peacefully instead of being rushed ■ “Insider-only” tactics to defend your gifts, talents and dreams against digital distraction and trivial diversions so you enjoy fortune, influence and a magnificent impact on the world ROBIN SHARMA is a globally respected humanitarian. Widely considered one of the world’s top leadership and personal optimization advisors, his clients include famed billionaires, professional sports superstars and many Fortune 100 companies. The author’s #1 bestsellers, such as The Monk Who Sold His Ferrari, The Greatness Guide and The Leader Who Had No Title are in over 92 languages, making him one of the most broadly read writers alive today. A portion of the proceeds of this book will go to The Robin Sharma Foundation for Children to help kids in need live better lives. “Robin Sharma’s books are helping people all over the world lead great lives.” —PAULO COELHO',
  //     image:
  //       'http://books.google.com/books/content?id=-GWBDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  //     isbn: 1234583264,
  //     language: 'en',
  //     maturityLevel: undefined,
  //     pageCount: 336,
  //     publishedDate: undefined,
  //     publisher: 'Jaico Publishing House',
  //     ratingsCount: 1,
  //     title: 'The 5 AM Club',
  //   },
  // ];

  useEffect(() => {
    // AsyncStorage.setItem('books', JSON.stringify(localArray))
    //   .then(() => {
    //     console.log('Data saved to local storage');
    //   })
    //   .catch((error) => {
    //     console.error('Error saving data to local storage:', error);
    //   });
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
        description={'All books downloaded successfully.'}
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
            <View style={{height: '50%'}} />
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
    // paddingHorizontal: verticalScale(10),
    paddingBottom: 75,
  },
});

export default AllBooks;
