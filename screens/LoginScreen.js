//import all packages
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as firebase from "firebase";
const { width, height } = Dimensions.get("window");

// function to handle login
export function loginHandler(username, password, loginComplete) {
  const user = username;
  const pass = password;

  var ref = firebase.database().ref("users/userInfo/");
  var refInfo = ref.child(user);
  var query = refInfo;

  query.once("value", function (snapshot) {
    if (snapshot.exists()) {
      var getpw = snapshot.child("Password").val();

      if (pass == getpw) {
        loginComplete();
      } else {
        alert("Incorrect Password");
      }
    } else {
      alert("Incorrect Username");
    }
  });
}

//main function
export default function Login({ navigation }) {
  //initialize all variables and assign values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginVerification = () => {
    loginHandler(username, password, loginComplete);
  };

  const loginComplete = () => {
    setUsername("");
    setPassword("");
    navigation.navigate("Initial", { myusername: username });
  };

  //display icon, label, textinput and button
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.icons}
        source={require("../assets/iconFamily.png")}
      />

      <Text style={styles.textLabel}>Username</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="Eg. ahmad"
          placeholderTextColor="#BEBEBE"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <Text style={styles.textLabel}>Password</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="abc123"
          placeholderTextColor="#BEBEBE"
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text
          style={styles.signup_button}
          onPress={() => navigation.navigate("Register")}
        >
          New to Organizer App?
          <Text style={{ fontWeight: "500", color: "#ECA1EC" }}> Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={loginVerification}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

//styles for all elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1FCFD",
    alignItems: "center",
    justifyContent: "center",
  },

  icons: {
    width: 170,
    height: 170,
    marginBottom: 25,
  },

  inputField: {
    backgroundColor: "white",
    width: "70%",
    height: 40,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },

  textLabel: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
  },

  TextInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },

  signup_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#96B4FF",
  },
});
