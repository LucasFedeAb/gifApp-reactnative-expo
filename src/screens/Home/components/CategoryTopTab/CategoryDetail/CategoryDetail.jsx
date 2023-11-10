import React, { useRef, useMemo } from "react";
import { View, ScrollView, Animated } from "react-native";
import styles from "./CategoryDetail.style";
import { useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useGetGifsQuery,
} from "../../../../../services/gifsApi";
import {
  AnimatedImageCategory,
  ListGifsDb,
  ListGifsTrendings,
  Loader,
} from "@components";

const CategoryDetail = ({ category }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { data: dataGifs, isLoading, isError } = useGetGifsQuery();
  const { data: dataCategories } = useGetCategoriesQuery();

  const dataFilterByCategory = useMemo(() => {
    if (dataGifs && !isLoading && !isError) {
      return dataGifs.filter((item) => item.category === category);
    }

    return [];
  }, [dataGifs, category, isLoading, isError]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      {isLoading && <Loader />}

      {category === "Tendencias" || category === "Emojis" ? (
        <ListGifsTrendings data={dataFilterByCategory} category={category} />
      ) : (
        <>
          <AnimatedImageCategory
            scrollY={scrollY}
            currentTheme={currentTheme}
            data={dataCategories}
            category={category}
          />
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            onScroll={handleScroll}
            scrollEventThrottle={1}
          >
            <ListGifsDb data={dataFilterByCategory} />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default CategoryDetail;
