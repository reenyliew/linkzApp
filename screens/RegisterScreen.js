//import all packages
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

//function to handle register and add user information to the database
export function RegisterHandler(
  email,
  password,
  fName,
  lName,
  UName,
  phone,
  registerComplete
) {
  const user = email;
  const username = UName;
  if (user != null && username != null) {
    firebase
      .database()
      .ref("users/userInfo/" + username + "/")
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          alert("This username has been taken. Please try another one");
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => registerComplete())
            .then(() => {
              const user = email;
              if (user != null) {
                firebase
                  .database()
                  .ref("users/userInfo/" + username + "/")
                  .set({
                    Email: email,
                    Password: password,
                    FirstName: fName,
                    LastName: lName,
                    Username: username,
                    Phone: phone,
                  });
              }
            })
            .catch((error) => alert(error));
        }
      });
  } else {
    alert("Please make sure you fill in email and username");
  }
}

//main function
export default function Register({ navigation }) {
  //configure all functions and variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [UName, setUName] = useState("");
  const [phone, setPhone] = useState("");

  const RegisterVerification = () => {
    RegisterHandler(
      email,
      password,
      fName,
      lName,
      UName,
      phone,
      registerComplete
    );
  };

  const registerComplete = () => {
    setEmail("");
    setPassword("");
    setfName("");
    setlName("");
    setUName("");
    setPhone("");
    navigation.navigate("Login");
  };

  //display icon, labels, textinput and button
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.icons}
        source={require("../assets/iconFamily.png")}
      />

      <Text style={styles.textLabel}>First Name</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="Albert"
          placeholderTextColor="#BEBEBE"
          value={fName}
          onChangeText={(fName) => setfName(fName)}
        />
      </View>

      <Text style={styles.textLabel}>Last Name</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="Tong"
          placeholderTextColor="#BEBEBE"
          value={lName}
          onChangeText={(lName) => setlName(lName)}
        />
      </View>

      <Text style={styles.textLabel}>Username</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="Tong"
          placeholderTextColor="#BEBEBE"
          value={UName}
          onChangeText={(UName) => setUName(UName)}
        />
      </View>

      <Text style={styles.textLabel}>Email address</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="abc@gmail.com"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <Text style={styles.textLabel}>Password</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="abc123"
          placeholderTextColor="#BEBEBE"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Text style={styles.textLabel}>Phone Number</Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.TextInput}
          placeholder="0123456789"
          value={phone}
          placeholderTextColor="#BEBEBE"
          onChangeText={(phone) => setPhone(phone)}
        />
      </View>

      <TouchableOpacity>
        <Text
          style={styles.login_button}
          onPress={() => navigation.navigate("Login")}
        >
          I'm already a member.
          <Text style={{ fontWeight: "500", color: "#ECA1EC" }}> Login</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpBtn} onPress={RegisterVerification}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

//set styles for all elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1FCFD",
    // alignItems: "center",
    // justifyContent: "center",
  },

  icons: {
    width: 120,
    height: 120,
    marginBottom: 25,
    marginLeft: 120,
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
    marginLeft: 45,
  },

  textLabel: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: 45,
  },

  TextInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },

  login_button: {
    height: 30,
    marginBottom: 10,
    marginLeft: 45,
  },

  signUpBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#96B4FF",
    marginLeft: 45,
  },
});
