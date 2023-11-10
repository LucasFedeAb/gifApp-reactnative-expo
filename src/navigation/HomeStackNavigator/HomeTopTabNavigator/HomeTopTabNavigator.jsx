import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CategoryTopTab } from "../../../screens/Home/components";
import styles from "./HomeTopTabNavigator.style";
import { useSelector } from "react-redux";
import { colorGreen } from "../../../constants/colors";
import { Home } from "../../../screens";

const TopTab = createMaterialTopTabNavigator();

const HomeTopTabNavigator = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const categories = useSelector((state) => state.gifs.uniqueCategories);

  return (
    <>
      <Home />
      <TopTab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: [
            styles.tabLabel,
            {
              color: "#fff",
            },
          ],
          tabBarItemStyle: [
            styles.tabBarItem,
            { borderColor: currentTheme.secondary },
          ],

          tabBarContentContainerStyle: [
            styles.tabBarContentContainer,
            {
              backgroundColor: "#000",
            },
          ],
          tabBarIndicatorStyle: {
            backgroundColor: colorGreen.secondary,
          },
        }}
      >
        {categories.map((category) => (
          <TopTab.Screen
            name={category}
            component={CategoryTopTab}
            initialParams={{ category }}
            key={category}
          />
        ))}
      </TopTab.Navigator>
    </>
  );
};

export default HomeTopTabNavigator;
