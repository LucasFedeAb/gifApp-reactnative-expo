import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListGifsScreen, SearchFocus, SearchScreen } from "../../screens";

const Stack = createNativeStackNavigator();

function SearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SearchNav"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="SearchNav"
        component={SearchScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="ListGifsNav"
        component={ListGifsScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchStackNavigator;
