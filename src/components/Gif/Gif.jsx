import React, { useState, useEffect, useMemo } from "react";
import { View, Image, TouchableOpacity, Pressable } from "react-native";
import styles from "./Gif.style";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../features/favoritesSlice/favoritesSlice";
import {
  addFavoriteGifFromDb,
  removeFavoriteGifFromDb,
  getFavoriteGifsFromDb,
} from "../../db";
import { useShareGif } from "../../hooks/useShareGif/useShareGif";
import { FavoriteButton, GifModal } from "@components";

const Gif = ({
  id,
  url,
  title,
  index,
  width = width || 175,
  heigth,
  isSaved,
}) => {
  const dispatch = useDispatch();
  const localId = useSelector((state) => state.auth.localId);
  const favorites = useSelector((state) => state.favorites.favoritesGifs);
  const { shareGif } = useShareGif();

  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleShareGif = () => {
    shareGif(url);
  };

  const handleAddGif = () => {
    dispatch(addFavorite(url, localId, id, title));
    addFavoriteGifFromDb(url, localId, id, title);
    setIsFavorite(true);
  };

  const handleRemoveGif = () => {
    dispatch(removeFavorite(url, localId, id, title));
    removeFavoriteGifFromDb(url, localId, id, title);
    setIsFavorite(false);
  };

  const masonryEffectHeight = [
    180, 140, 150, 220, 180, 140, 110, 150, 180, 165, 200,
  ];
  const height = heigth
    ? heigth
    : masonryEffectHeight[index % masonryEffectHeight.length];

  const backgroundColors = [
    "#016450",
    "#7358ff",
    "#fff57c",
    "#34b5d4",
    "#1e3264",
    "#e8125c",
    "#e1118b",
    "#158a08",
    "#0bd792",
    "#509bf6",
    "#ff8b8a",
    "#e9142a",
    "#3c1860",
  ];
  const backgroundColor = backgroundColors[index % backgroundColors.length];

  useEffect(() => {
    if (localId) {
      getFavoriteGifsFromDb(localId)
        .then((favorites) => {
          const updatedFavoritesList = favorites.map((favorite) => ({
            id: favorite.gifId,
            title: favorite.title,
            url: url,
          }));

          setIsFavorite(
            updatedFavoritesList.some(
              (favorite) => favorite.id === id && favorite.url === url
            )
          );
        })
        .catch((error) => {
          console.log("Error al obtener los GIFs favoritos:", error);
        });
    }
  }, [localId, favorites]);

  const memoizedGifImage = useMemo(() => {
    return (
      <Image
        source={{ uri: url }}
        style={[styles.imageGif, { height, backgroundColor, width }]}
      />
    );
  }, [url, height, backgroundColor, width]);

  return (
    <>
      {modalVisible && (
        <GifModal
          url={url}
          title={title}
          isFavorite={isFavorite}
          handleShareGif={handleShareGif}
          handleAddGif={handleAddGif}
          handleRemoveGif={handleRemoveGif}
          handleCloseModal={() => setModalVisible(false)}
        />
      )}

      <View style={[styles.gif]}>
        <Pressable style={styles.gifTrending} onPress={handleModal}>
          {memoizedGifImage}
        </Pressable>

        {isSaved ? (
          <TouchableOpacity style={styles.favIcon} onPress={handleRemoveGif}>
            <Ionicons name="trash" size={25} color="red" />
          </TouchableOpacity>
        ) : (
          <>
            <FavoriteButton
              isFavorite={isFavorite}
              onPress={isFavorite ? handleRemoveGif : handleAddGif}
              styleCustom={styles.favIcon}
            />
          </>
        )}
      </View>
    </>
  );
};

export default Gif;
