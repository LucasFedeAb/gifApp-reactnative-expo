import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./SearchScreen.style";
import SearchInput from "@components/SearchInput/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategorySelected,
  setTrendingSearchTerms,
} from "../../features/gifsSlice/gifsSlice";
import { useNavigation } from "@react-navigation/native";
import { useGetTrendingTermsQuery } from "../../services/giphyApi";

const SearchScreen = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const trendingSearchTerms = useSelector(
    (state) => state.gifs.trendingSearchTerms
  );
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { data: dataTrendingTerms, isLoading } = useGetTrendingTermsQuery();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const titleOpacity = useRef(new Animated.Value(1)).current;
  const searchInputTranslateY = useRef(new Animated.Value(0)).current;
  const exploreTranslateY = useRef(new Animated.Value(0)).current;
  const flatTranslateY = useRef(new Animated.Value(0)).current;

  const handleClickCategory = (categorySelect) => {
    dispatch(setCategorySelected(categorySelect));
    navigation.navigate("ListGifsNav");
  };

  const onSearchByKeyword = (keyword) => {
    if (keyword) {
      dispatch(setCategorySelected(keyword));
      navigation.navigate("ListGifsNav");
    }
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: searchInputTranslateY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    if (dataTrendingTerms) {
      dispatch(setTrendingSearchTerms(dataTrendingTerms.data));
    }
  }, [dataTrendingTerms]);

  const backgroundColors = [
    "#016450",
    "#7358ff",
    "#1e3264",
    "#e8125c",
    "#e1118b",
    "#158a08",
    "#509bf6",
    "#e9142a",
  ];

  return (
    <>
      <StatusBar
        animated={true}
        style={isDarkMode ? "light" : "dark"}
        backgroundColor="transparent"
      />
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        <View style={[styles.containerSearch]}>
          <Animated.View
            style={[
              styles.boxTitle,
              {
                opacity: titleOpacity,
              },
            ]}
          >
            <Text style={[styles.title, { color: currentTheme.color }]}>
              Buscar
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.searchInputContainer,
              {
                transform: [{ translateY: searchInputTranslateY }],
              },
            ]}
          >
            <SearchInput onSearch={onSearchByKeyword} />
          </Animated.View>
          <Animated.View
            style={[
              styles.exploreTextContainer,
              {
                transform: [{ translateY: exploreTranslateY }],
              },
            ]}
          >
            <Text style={[styles.subTitle, { color: currentTheme.color }]}>
              Tendencias:
            </Text>
          </Animated.View>
        </View>

        {isLoading ? (
          <Text>Loading data ...</Text>
        ) : (
          <>
            <Animated.View
              style={[
                {
                  flex: 1,
                  transform: [{ translateY: flatTranslateY }],
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <FlatList
                  data={trendingSearchTerms}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapperStyle}
                  keyExtractor={(item) => item}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={[
                        styles.categoryItem,
                        {
                          backgroundColor:
                            backgroundColors[index % backgroundColors.length],
                        },
                      ]}
                      key={item}
                      onPress={() => handleClickCategory(item)}
                    >
                      <Text style={styles.titleCategory}>
                        {item.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  )}
                  onScroll={(event) => {
                    const scrollY = event.nativeEvent.contentOffset.y;
                    const shouldHideTitle = scrollY > 0;

                    if (shouldHideTitle) {
                      Animated.timing(titleOpacity, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: false,
                      }).start();
                    } else {
                      Animated.timing(titleOpacity, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: false,
                      }).start();
                    }

                    // Controlar la animación de la translación
                    const translateYValue = shouldHideTitle ? -80 : 0;
                    Animated.parallel([
                      Animated.timing(searchInputTranslateY, {
                        toValue: translateYValue,
                        duration: 50,
                        useNativeDriver: false,
                      }),
                      Animated.timing(exploreTranslateY, {
                        toValue: translateYValue,
                        duration: 75,
                        useNativeDriver: false,
                      }),
                      Animated.timing(flatTranslateY, {
                        toValue: translateYValue,
                        duration: 75,
                        useNativeDriver: false,
                      }),
                    ]).start();
                  }}
                />
              </View>
            </Animated.View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;
