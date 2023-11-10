import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, colorGreen } from "../../constants/colors";
import styles from "./BottomTabNavigator.style.js";
import HomeStackNavigator from "../HomeStackNavigator/HomeStackNavigator";
import SearchStackNavigator from "../SearchStackNavigator/SearchStackNavigator";
import { useSelector } from "react-redux";
import { SavedScreen } from "../../screens";
import ProfileStackNavigator from "../ProfileStackNavigator/ProfileStackNavigator";

const BottomTab = createBottomTabNavigator();

function CustomCreateIcon({ focused }) {
  return (
    <View style={focused ? styles.iconPlusStyleFocus : styles.iconPlusStyle}>
      <Ionicons name="add-circle" size={40} color={colors.primary} />
      {focused && <Text style={styles.tabLabelFocusPlus}>Crear</Text>}
    </View>
  );
}

function BottomTabNavigator() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  return (
    <BottomTab.Navigator
      initialRouteName="HomeNav"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: currentTheme.tabBarBackgroundColor,
          },
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let labelText;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            labelText = "Inicio";
          } else if (route.name === "Saves") {
            iconName = focused ? "bookmarks" : "bookmark-outline";
            labelText = "Guardados";
          } else if (route.name === "Create") {
            return <CustomCreateIcon focused={focused} />;
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
            labelText = "Buscar";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            labelText = "Perfil";
          }

          return (
            <View style={styles.linkItem}>
              <Ionicons
                name={iconName}
                size={25}
                color={
                  focused
                    ? currentTheme.tabIconFocus
                    : currentTheme.tabIconColor
                }
              />
              {focused && (
                <Text
                  style={[
                    styles.tabLabelFocus,
                    { color: currentTheme.tabLabelFocus },
                  ]}
                >
                  {labelText}
                </Text>
              )}
            </View>
          );
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          animation: "fade",
        }}
      />
      <BottomTab.Screen
        name="Saves"
        component={SavedScreen}
        options={{
          animation: "fade",
        }}
      />
      {/* <BottomTab.Screen name="Create" component={SearchStackNavigator} /> */}
      <BottomTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          animation: "fade",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          animation: "fade",
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
