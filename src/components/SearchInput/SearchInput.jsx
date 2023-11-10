import { TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./SearchInput.style";
import { useSelector } from "react-redux";

const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  const search = () => {
    onSearch(value);
    clearInput();
  };

  const clearInput = () => {
    setValue("");
    onSearch("");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: "#f2f2f2",
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <TouchableOpacity style={styles.searchIcon} onPress={search}>
          <Ionicons name={"search-outline"} size={20} color={"#000"} />
        </TouchableOpacity>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.searchField}
          placeholder="Buscar en Giphy..."
          placeholderTextColor="#010718"
          onSubmitEditing={search}
        />

        <TouchableOpacity style={styles.closeIcon} onPress={clearInput}>
          <Ionicons name="close" size={25} color={"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
