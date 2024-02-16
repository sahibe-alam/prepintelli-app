import SelectDropdown from 'react-native-select-dropdown';
import {spacing} from '../utils/commonStyle';
import {StyleSheet, View} from 'react-native';
const DropDownSelect = () => {
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

  const styles = getStyles();
  return (
    <View style={styles.wrapper}>
      <SelectDropdown
        search={true}
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  );
};
const getStyles = () =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: spacing.l,
    },
  });
export default DropDownSelect;
