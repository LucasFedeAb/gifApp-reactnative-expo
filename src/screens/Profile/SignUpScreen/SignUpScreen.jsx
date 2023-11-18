import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./SignUpScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { useSignUpMutation } from "../../../services/authApi";
import { usePostInfoUserMutation } from "../../../services/infoUserApi";
import { useDispatch } from "react-redux";
import { setUser, setInfoUser } from "../../../features/authSlice/authSlice";
import { insertSession } from "../../../db";
import ButtonGradient from "../../../components/ButtonGradient/ButtonGradient";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [confirmTerms, setconfirmTerms] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [triggerSignup] = useSignUpMutation();
  const [triggerSaveInfoUser] = usePostInfoUserMutation();

  const onSubmit = async () => {
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      setPasswordError(
        "La contraseña debe contener al menos 8 caracteres, una letra mayúscula y un número."
      );
      return;
    } else {
      setPasswordError(null);
    }

    if (password !== confirmPass) {
      setPasswordError("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    } else {
      setPasswordError(null);
    }

    try {
      const result = await triggerSignup({ email, password }).unwrap();
      dispatch(setUser(result));
      dispatch(
        setInfoUser({
          username: name.trim(),
          image: null,
        })
      );
      insertSession({
        localId: result.localId,
        email: result.email,
        token: result.idToken,
      })
        .then((result) => {
          console.log("insertSession", result);
        })
        .catch((error) => {
          setError(error.message);
          console.log("Error messgge", error.message);
        });

      await triggerSaveInfoUser({
        username: name,
        image: null,
        localId: result.localId,
      });
    } catch (error) {
      let errorMessage = error.data.error.message;
      let errorShow;
      if (errorMessage === "INVALID_EMAIL") {
        errorShow =
          "Correo electrónico inválido. Por favor, introduce una dirección de correo válida.";
      } else if (errorMessage === "INVALID_LOGIN_CREDENTIALS") {
        errorShow =
          "Contraseña incorrecta. Verifica tu contraseña e intenta de nuevo.";
      } else if (errorMessage === "MISSING_PASSWORD") {
        errorShow = "Falta introducir la contraseña.";
      }

      setError(errorShow);
      console.error(error);
      console.log("Error messgge 2", error);
    }
  };

  const seePassword = () => {
    setHidePassword(!hidePassword);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <Text style={styles.logo}>Gif App</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.titulo}>Welcome !</Text>
        <Text style={styles.subTitle}>Sign In to your account</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="person-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="Username"
              placeholderTextColor={"gray"}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="mail-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="E-mail"
              placeholderTextColor={"gray"}
              value={email.trim()}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="lock-closed-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="Password"
              placeholderTextColor={"gray"}
              value={password.trim()}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
            />
            <TouchableOpacity onPress={seePassword}>
              <Ionicons
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                size={25}
                color="#ccc"
                style={styles.iconEye}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="lock-closed-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="Confirm Password"
              placeholderTextColor={"gray"}
              value={confirmPass.trim()}
              onChangeText={setConfirmPass}
              secureTextEntry={hideConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setHideConfirmPassword(!hideConfirmPassword);
              }}
            >
              <Ionicons
                name={hideConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={25}
                color="#ccc"
                style={styles.iconEye}
              />
            </TouchableOpacity>
          </View>
        </View>
        {passwordError && (
          <View style={styles.containerError}>
            <Text style={styles.textError}>{passwordError}</Text>
          </View>
        )}
        {error && (
          <View style={styles.containerError}>
            <Text style={styles.textError}>{error}</Text>
          </View>
        )}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <ButtonGradient label={"CREATE ACCOUNT"} onPress={onSubmit} />
        <Text style={styles.noAccount}>Don't have an account?</Text>
        <ButtonGradient
          label={"LOGIN"}
          onPress={() => {
            navigation.navigate("LoginScreen");
            setEmail("");
            setPassword("");
            setError(null);
          }}
        />

        <View style={styles.termsContainer}>
          <TouchableOpacity
            onPress={() => {
              setconfirmTerms(!confirmTerms);
            }}
          >
            <Ionicons
              name={confirmTerms ? "checkbox" : "square-outline"}
              size={15}
              color="#7cb799"
            />
          </TouchableOpacity>

          <Text style={styles.terms}>
            Acepto los Terminos y Condiciones del Servicio y la Politica de
            Privacidad de Gif App
          </Text>
        </View>
        <StatusBar style="light" />
      </View>
    </View>
  );
};

export default SignUpScreen;
