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
import { usePostProfileImageMutation } from "../../../services/permissionsApi";
import { deleteSession } from "../../../db";

import styles from "./ProfileScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.auth.imageCamera);
  const email = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { localId } = useSelector((state) => state.auth);
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
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
      }
    }
  };

  useEffect(() => {
    confirmImage();
  }, [image]);

  const confirmImage = () => {
    triggerSaveProfileImage({ image, localId });
  };

  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to camara roll is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult)

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
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
                <Image
                  source={{
                    uri: image,
                  }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.containerButton}>
                <Pressable style={styles.cameraImage} onPress={pickImage}>
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
                <Pressable style={styles.cameraImage} onPress={pickImage}>
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
    </>
  );
};

export default ProfileScreen;
