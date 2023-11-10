import React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoriteButton } from "@components";
import styles from "./GifModal.style";

const GifModal = ({
  url,
  title,
  isFavorite,
  handleShareGif,
  handleAddGif,
  handleRemoveGif,
  handleCloseModal,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={{ uri: url }}
            resizeMode="stretch"
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View>
              <TouchableOpacity
                style={styles.buttonShare}
                onPress={() => handleShareGif(url)}
              >
                <View>
                  <Text style={styles.labelButtonShare}>Compartir Gif</Text>
                </View>
                <Ionicons name="share-social-sharp" size={30} color="skyblue" />
              </TouchableOpacity>
            </View>
            <View>
              <FavoriteButton
                isFavorite={isFavorite}
                onPress={isFavorite ? handleRemoveGif : handleAddGif}
                styleCustom={styles.buttonFavorite}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.favIcon} onPress={handleCloseModal}>
            <Ionicons name="close" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GifModal;
