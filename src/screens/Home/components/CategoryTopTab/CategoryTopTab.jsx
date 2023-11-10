import { View } from "react-native";
import CategoryDetail from "./CategoryDetail/CategoryDetail";
import { useSelector } from "react-redux";
import styles from "./CategoryTopTab.style";

const CategoryTopTab = ({ route }) => {
  const { category } = route.params;
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      <CategoryDetail category={category} />
    </View>
  );
};

export default CategoryTopTab;
