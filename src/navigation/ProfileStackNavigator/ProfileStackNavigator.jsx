import { ProfileScreen } from "../../screens";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileNav"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <ProfileStack.Screen
        name="ProfileNav"
        component={ProfileScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
