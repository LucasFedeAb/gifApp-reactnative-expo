import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCameraImage,
  clearUser,
} from "../../../features/authSlice/authSlice";
import {
  usePostProfileImageMutation,
  useDeleteProfileImageMutation,
} from "../../../services/permissionsApi";
import { deleteSession } from "../../../db";
import { useToast } from "../../../hooks";
import styles from "./ProfileScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomModal, Toast } from "@components";
import { colorGreen } from "../../../constants/colors";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const image = useSelector((state) => state.auth.imageCamera);
  const email = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { localId } = useSelector((state) => state.auth);

  const [triggerSaveProfileImage] = usePostProfileImageMutation();
  const [deleteImage] = useDeleteProfileImageMutation();
  const { showToast, hideToast, showToastMessage } = useToast();

  const [modalVisible, setModalVisible] = useState(false);
  const [toggleToast, setToggleToast] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [isImageLongPressed, setIsImageLongPressed] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageDeleteSuccess, setImageDeleteSuccess] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const modalContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>Editar foto de perfil</Text>

        <View style={styles.containerButtonsModal}>
          <TouchableOpacity onPress={pickImage} style={styles.buttonModal}>
            <Text style={styles.labelButtonModal}>Tomar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.buttonModal}
          >
            <Text style={styles.labelButtonModal}>
              Seleccionar desde galeria
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const modalDeleteContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>¿Eliminar foto de perfil?</Text>

        <View style={styles.containerButtonsModal}>
          <TouchableOpacity
            onPress={handleDeleteImage}
            style={styles.buttonModalDelete}
          >
            <Text style={styles.labelButtonModal}>Eliminar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeModalDelete}
            style={styles.buttonModal}
          >
            <Text style={styles.labelButtonModal}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    closeModal();
    const isCameraOk = await verifyCameraPermissions();

    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.4,
      });
      if (!result.canceled) {
        dispatch(
          setCameraImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
        );
        //Almacenar image en db
        try {
          await triggerSaveProfileImage({
            image: `data:image/jpeg;base64,${result.assets[0].base64}`,
            localId,
          });
        } catch (error) {
          console.error("Error al guardar la imagen:", error);
          setErrorImage(true);
        }
        setImageUpload(true);
        showToastMessage();
        setToggleToast(true);
      }
    }
  };

  let openImagePickerAsync = async () => {
    closeModal();
    const isCameraOk = await verifyCameraPermissions();

    if (isCameraOk) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.4,
      });
      if (!result.canceled) {
        dispatch(setCameraImage(`${result.assets[0].uri}`));
        //Almacenar image en db
        try {
          await triggerSaveProfileImage({
            image: `${result.assets[0].uri}`,
            localId,
          });
        } catch (error) {
          console.error("Error al guardar la imagen:", error);
          setErrorImage(true);
        }
        setImageUpload(true);
        showToastMessage();
        setToggleToast(true);
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const result = await deleteImage(localId);
      if (result.data === null) {
        dispatch(setCameraImage(result.data));
        setImageDeleteSuccess(true);
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
    closeModalDelete();
    showToastMessage();
    setToggleToast(true);
  };

  const handleImage = () => {
    setIsImageLongPressed(true);
  };

  const openModalDelete = () => {
    if (isImageLongPressed) {
      setIsModalDelete(true);
    }
  };

  const closeModalDelete = () => {
    setIsModalDelete(false);
    setIsImageLongPressed(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    deleteSession();
  };

  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <SafeAreaView style={styles.containerHeader}>
        <View>
          <Text style={[styles.textHeader]}>Perfil</Text>
        </View>
        <View>
          <Ionicons name="person-circle-outline" size={30} color="#fff" />
        </View>
      </SafeAreaView>
      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        content={modalContent}
      />
      <CustomModal
        visible={isModalDelete}
        onClose={closeModalDelete}
        content={modalDeleteContent}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        <View style={styles.containerContentImage}>
          {image ? (
            <>
              <View
                style={[
                  styles.containerImage,
                  { borderColor: currentTheme.backgroundColor },
                ]}
              >
                <Pressable delayLongPress={300} onLongPress={handleImage}>
                  <Image
                    source={{
                      uri: image,
                    }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  {isImageLongPressed && (
                    <View style={[styles.trashIcon]}>
                      <TouchableOpacity onPress={openModalDelete}>
                        <Ionicons name="trash-bin" size={40} color="red" />
                      </TouchableOpacity>
                    </View>
                  )}
                </Pressable>
              </View>
              <View style={styles.containerButton}>
                <Pressable style={styles.cameraImage} onPress={openModal}>
                  <Ionicons name="camera-reverse" size={25} color="white" />
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.containerImage,
                  { borderColor: currentTheme.backgroundColor },
                ]}
              >
                <Image
                  source={{
                    uri: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm44bmx5NDU1bm5ybWNjazIyaDNzbm5yc2o4MWN3eWFveXdqdHZwciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3vqiIuTqcYWy6AdsXr/giphy.gif",
                  }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.containerButton}>
                <Pressable style={styles.cameraImage} onPress={openModal}>
                  <Ionicons name="camera-reverse" size={25} color="white" />
                </Pressable>
              </View>
            </>
          )}
        </View>

        <View style={styles.userEmail}>
          <Text style={[styles.emailText]}>Usuario: {email}</Text>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={20} color="#fff" />
            <Text style={styles.labelButtonLogout}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.containerToast,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        {showToast && toggleToast && imageUpload && (
          <Toast
            message={
              errorImage
                ? "Error al guardar la imagen"
                : "Se actualizó la imagen de perfil"
            }
            visible={showToast}
            hideToast={() => {
              hideToast();
              setErrorImage(false);
              setImageUpload(false);
            }}
            duration={2000}
            icon={!errorImage && "checkmark"}
            colorText={!errorImage && { color: colorGreen.quinquenary }}
            iconColor={!errorImage && colorGreen.quinquenary}
          />
        )}
        {showToast && toggleToast && imageDeleteSuccess && (
          <Toast
            message={"Imagen Eliminada"}
            visible={showToast}
            hideToast={() => {
              hideToast();
              setImageDeleteSuccess(false);
            }}
            duration={2000}
          />
        )}
      </View>
    </>
  );
};

export default ProfileScreen;
