import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/Dimentions';
import {Colors, Fonts} from '../../constants';
import BackButton from '../Buttons/BackButton';

const HeaderWithSearchInput = ({
  title,
  isInputVisible,
  searchText,
  onIconPress,
  onBackBtnPress,
  onSearchTextChange,
  image,
  showIcon,
  titleStyle,
  titleColor,
  secondIcon,
  onSecondIconPress,
  onThirdIconPress,
  thirdIcon
}: any) => {
  const Icon = image;
  const Icon2 = secondIcon;
  const Icon3 = thirdIcon;
  return (
    <View style={styles.container}>
      {onBackBtnPress && <BackButton onBackBtnPress={onBackBtnPress} />}
      {!isInputVisible && (
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                marginRight: titleStyle ? titleStyle : 0,
                color: titleColor ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
              },
            ]}>
            {title}
          </Text>
          {onIconPress && (
            <TouchableOpacity style={styles.icon} onPress={onIconPress}>
              <Icon color="black" style={styles.searchIcon} />
            </TouchableOpacity>
          )}
          {secondIcon && (
            <TouchableOpacity style={styles.icon} onPress={onSecondIconPress}>
              <Icon2 color="black" style={styles.searchIcon2} />
            </TouchableOpacity>
          )}
          {thirdIcon && (
            <TouchableOpacity style={styles.icon} onPress={onThirdIconPress}>
              <Icon3 color="black" style={{height:30,width:30}} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {isInputVisible && (
        <View style={styles.inputContainer}>
          <TextInput
            cursorColor={Colors.DEFAULT_BLACK}
            style={styles.textInput}
            value={searchText}
            onChangeText={onSearchTextChange}
            autoFocus={true}
            placeholder="Search..."
          />
          {secondIcon && (
            <TouchableOpacity style={styles.icon} onPress={onIconPress}>
              <Icon color="black" style={styles.searchIcon} />
            </TouchableOpacity>
          )}
          {showIcon && (
            <TouchableOpacity style={styles.icon} onPress={onSecondIconPress}>
              <Icon2 color="black" style={styles.searchIcon2} />
            </TouchableOpacity>
          )}
           {thirdIcon && (
            <TouchableOpacity style={styles.icon} onPress={onThirdIconPress}>
              <Icon3 color="black" style={{height:30,width:30}} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 20,
    fontWeight: 'bold',
    flexGrow: 1,
    textAlign: 'center',
  },
  searchIcon: {
    margin: 10,
  },
  searchIcon2: {
    margin: 10,
    width:35,
    height:35,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderColor: Colors.BG_COLOR,
    borderWidth: 1,
    backgroundColor: 'rgba(247, 247, 249, 1)',
    fontFamily: Fonts.POPPINS_REGULAR,
    padding: 8,
    borderRadius: 10,
    width: horizontalScale(190),
  },
  icon: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: verticalScale(50),
    width: verticalScale(50),
    justifyContent: 'center',
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 7,
    elevation: 10,
    shadowRadius: 10,
    shadowOpacity: 0.9,
  },
});

export default HeaderWithSearchInput;
