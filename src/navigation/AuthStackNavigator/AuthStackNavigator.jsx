import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignUpScreen, ProfileScreen } from "../../screens";

const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <AuthStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          animation: "slide_from_left",
        }}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          animation: "slide_from_left",
        }}
      />
      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          animation: "slide_from_left",
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
