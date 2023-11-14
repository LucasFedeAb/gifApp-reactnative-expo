import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./SavedScreen.style";
import { getFavoriteGifsFromDb, resetAllFavorites } from "../../db";
import { setFavoritesGifs } from "../../features/favoritesSlice/favoritesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "../../hooks";
import { CustomModal, Header, ListGifs, Loader, Toast } from "@components";

const SavedScreen = () => {
  const dispatch = useDispatch();
  const localId = useSelector((state) => state.auth.localId);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const favorites = useSelector((state) => state.favorites.favoritesGifs);
  const lastAction = useSelector((state) => state.favorites.lastAction);

  const { showToast, hideToast, showToastMessage } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleToast, setToggleToast] = useState(false);
  const [errorDeleteAllFav, setErrorDeleteAllFav] = useState(false);
  const [favoritesListData, setFavoritesListData] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const modalContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>
          ¿Desea eliminar todos tus gifs favoritos?
        </Text>

        <View style={styles.containerButtonsModal}>
          <TouchableOpacity
            onPress={handleResetFavorites}
            style={styles.buttonModalDelete}
          >
            <Text style={styles.labelButtonModal}>Eliminar Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.buttonModalCancel}
          >
            <Text style={styles.labelButtonModal}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (localId) {
      getFavoriteGifsFromDb(localId)
        .then((favorites) => {
          //console.log("favoritesDB", favorites);
          if (favorites && favorites.length > 0) {
            const updatedFavoritesList = favorites?.map((favorite, index) => ({
              id: favorite.gifId,
              title: favorite.title,
              url: favorite.url,
              index: index,
              isSaved: true,
            }));

            setFavoritesListData(updatedFavoritesList);
          } else {
            setFavoritesListData([]);
          }
        })
        .catch((error) => {
          console.log("Error al obtener tus GIFs favoritos:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [localId, favorites]);

  const handleResetFavorites = async () => {
    try {
      const rowsAffected = await resetAllFavorites();
      console.log(`Se eliminaron ${rowsAffected} favoritos.`);
      setFavoritesListData([]);
      dispatch(setFavoritesGifs([]));
    } catch (error) {
      setErrorDeleteAllFav(true);
      console.error("Error al restablecer los favoritos:", error);
    }
    closeModal();
    showToastMessage();
    setToggleToast(true);
  };

  return (
    <>
      <Header title={"Favoritos"} onPress={openModal} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        <CustomModal
          visible={modalVisible}
          onClose={closeModal}
          content={modalContent}
        />
        {isLoading && <Loader />}
        {!isLoading && favoritesListData.length === 0 && (
          <View style={styles.containerEmptyFavorites}>
            <Text
              style={[
                styles.emptyFavorites,
                {
                  color: currentTheme.color,
                },
              ]}
            >
              ¡Tu galería de GIFs favoritos está lista y esperando 📁✨!
            </Text>
          </View>
        )}
        {favoritesListData.length > 0 && <ListGifs data={favoritesListData} />}
        {showToast && favorites.length === 0 && toggleToast && (
          <Toast
            message={"Se eliminaron todos los gifs de Favoritos"}
            visible={showToast}
            hideToast={() => {
              hideToast();
              setToggleToast(false);
              setErrorDeleteAllFav(false);
            }}
          />
        )}
        {showToast &&
          favorites.length > 0 &&
          toggleToast &&
          errorDeleteAllFav && (
            <Toast
              message={"Error al eliminar los gifs favoritos"}
              visible={showToast}
              hideToast={() => {
                hideToast();
                setToggleToast(false);
                setErrorDeleteAllFav(false);
              }}
            />
          )}
        {showToast && lastAction === "removeFav" && !toggleToast && (
          <Toast
            message={"Se eliminó gif de Favoritos"}
            visible={showToast}
            hideToast={hideToast}
          />
        )}
      </View>
    </>
  );
};

export default SavedScreen;
