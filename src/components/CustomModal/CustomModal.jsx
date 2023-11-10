import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./CustomModal.style";

const CustomModal = ({ visible, onClose, content }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => onClose()}
          >
            <Ionicons name="close" size={20} color="#000" />
          </TouchableOpacity>
          {content && content()}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
