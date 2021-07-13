//import all packages
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import { Appbar } from "react-native-paper";

//main function
export default function ProfileScreen({ navigation }) {
  //get username param from menu screen
  // const { myusername } = route.params;

  //const [data, setProfileData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);

  //automatically get data after changes
  useEffect(() => {
    readInfo();
  }, []);

  //function to update information that stored in database
  const updateProfile = () => {
    firebase
      .database()
      .ref("users/userInfo/" + "abby123")
      .set({
        FirstName: fName,
        LastName: lName,
        Email: email,
        Password: password,
        Phone: phone,
      });
  };

  //get data from database
  const readInfo = () => {
    try {
      firebase
        .database()
        .ref("/users/userInfo/")
        .on("value", function (snapshop) {
          const items = [];
          snapshop.forEach((child1) => {
            items.push(
              child1.val().Email,
              child1.val().FirstName,
              child1.val().LastName,
              child1.val().Password,
              child1.val().Phone
            );
          });

          setEmail(items[0]);
          setfName(items[1]);
          setlName(items[2]);
          setPassword(items[3]);
          setPhone(items[4]);
        });
    } catch (error) {}
  };
  //display all labels, textinputs and buttons
  return (
    <>
      <Appbar.Header style={styles.top}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content
          title={<Text>Profile</Text>}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => navigation.navigate("Login")}
        />
      </Appbar.Header>
      <ScrollView style={styles.container}>
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
            placeholderTextColor="#BEBEBE"
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
          />
        </View>

        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => {
            updateProfile();
          }}
        >
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => {
            navigation.navigate("Update");
          }}
        >
          <Text style={styles.btnText}>Check</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </>
  );
}

//set styles for all elements
const styles = StyleSheet.create({
  top: {
    height: 20,
    paddingBottom: 27,
    backgroundColor: "#F1FCFD",
  },

  container: {
    flex: 1,
    backgroundColor: "#F1FCFD",
    padding: 20,
  },

  updateBtn: {
    margin: 20,
    backgroundColor: "#96B4FF",
    borderRadius: 20,
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
  },

  btnText: {
    fontSize: 20,
  },

  inputField: {
    backgroundColor: "white",
    width: "70%",
    height: 40,
    marginBottom: 15,
    marginLeft: "15%",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },

  textLabel: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginTop: 30,
    marginLeft: "15%",
  },

  textTitle: {
    fontSize: 25,
    marginTop: 15,
    color: "#333",
  },

  TextInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },

  UserDetails: {
    fontSize: 20,
    marginLeft: 10,
  },

  listText: {
    fontSize: 20,
    marginTop: 30,
  },
});
