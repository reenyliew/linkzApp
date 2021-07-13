//import all packages
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { Appbar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

//function to add item to the database
export function addItem(task) {
  try {
    firebase.database().ref("todo/list/").push({
      Task: task,
    });
  } catch (error) {}
}

//main function
export default function Todo({ navigation }) {
  //initialize and configure all variables
  const [task, setTask] = useState("");
  const addTask = () => {
    addItem(task);
  };
  const [data, setData] = useState([]);

  const deleteTodo = () => {
    firebase.database().ref("todo/list/").remove();
  };

  //display data from database
  const renderItem = ({ item }) => {
    return <Text style={styles.cardContent}>{item}</Text>;
  };

  //get data from database
  const readData = () => {
    try {
      firebase
        .database()
        .ref("/todo/list/")
        .on("value", function (snapshop) {
          const items = [];
          snapshop.forEach((child1) => {
            items.push(child1.val().Task);
          });
          setData(items);
        });
    } catch (error) {}
    return data;
  };

  //automatically get data after changes
  useEffect(() => {
    readData();
  }, []);

  //display all icon, textinput, text and flatlist
  return (
    <>
      <Appbar.Header style={styles.top}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content
          title={<Text>To do List</Text>}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => navigation.navigate("Login")}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.cardContent}></View>
        <SimpleLineIcons
          name="plus"
          style={styles.icons}
          size={40}
          color="blue"
          onPress={addTask}
        />

        <Text style={styles.textLabel}>Task</Text>
        <View style={styles.inputField}>
          <TextInput
            style={styles.TextInput}
            onChangeText={(task) => setTask(task)}
          />
        </View>

        <View style={styles.container1}>
          <Text style={styles.todoWord}>To Do List </Text>
          <TouchableOpacity
            onPress={() => {
              deleteTodo();
            }}
          >
            <View style={styles.dustbin}>
              <AntDesign name="delete" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.flat}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

//set style to all elements
const styles = StyleSheet.create({
  top: {
    height: 20,
    paddingBottom: 27,
    backgroundColor: "#F1FCFD",
  },

  container: {
    flex: 1,
    backgroundColor: "#F1FCFD",
    alignItems: "center",
    justifyContent: "center",
  },

  container1: {
    flexDirection: "row",
  },

  dustbin: {
    //backgroundColor: "#96B4FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#96B4FF",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  icons: {
    top: 5,
    marginBottom: 10,
  },

  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
    fontSize: 15,
  },

  inputField: {
    backgroundColor: "white",
    width: "85%",
    height: 40,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 20,
  },

  textLabel: {
    color: "#8A8F9E",
    fontSize: 13,
    textTransform: "uppercase",
    marginTop: 20,
  },

  TextInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },

  flat: {
    borderColor: "#96B4FF",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    width: "80%",
    marginVertical: 30,
    marginHorizontal: 16,
  },

  todoWord: {
    fontSize: 20,
  },
});
