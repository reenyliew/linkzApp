//import all packages used in this screen
import firebase from "firebase";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";
import { Appbar } from "react-native-paper";

//main function
export default function EventScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputtitle, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { myusername, eventDate, GROUPID, Datediff } = route.params;
  console.log(myusername + " " + eventDate);

  //get data from database
  const readData = () => {
    try {
      firebase
        .database()
        .ref("Event/" + eventDate + "/" + GROUPID + "/")
        .on("value", function (snapshop) {
          const items = [];
          snapshop.forEach((child1) => {
            items.push({
              key1: child1.key,
              title: child1.val().Title,
              getEDate: child1.val().eventDate,
              getcreatedby: child1.val().CreatedBy,
            });
          });

          setData(items);
          console.log("dajd", items);
        });
    } catch (error) {
      console.log("event", eventDate);
    }
    return data;
  };
  //automatically get data after changes
  useEffect(() => {
    readData();
  }, [eventDate]);

  //bind firebase data into item
  const Item = ({ title, getEDate, getcreatedby }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.titledate}>Event Date: {eventDate}</Text>
      <Text style={styles.titleplanner}>Planner: {getcreatedby}</Text>

      <Text style={styles.titlecountdown}>Remaining Days: {Datediff}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      getEDate={item.getEDate}
      getcreatedby={item.getcreatedby}
    />
  );

  //add new event to firebase
  const addEventToFirebase = () => {
    if (!inputtitle.trim() || !description.trim()) {
      alert("Please enter valid title and description");
    } else if (inputtitle != null && description != null) {
      firebase
        .database()
        .ref("Event/" + eventDate + "/" + GROUPID + "/")
        .push({
          CreatedBy: myusername,
          Description: description,
          Title: inputtitle,
          eventDate: eventDate,
        });

      setModalVisible(!modalVisible);
      ToastAndroid.show("Event added!", ToastAndroid.SHORT);
    }
  };

  //display icon and calendar
  return (
    <>
      <Appbar.Header style={styles.top}>
        <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
        <Appbar.Content
          title={<Text>Event</Text>}
          style={{ alignItems: "center" }}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => navigation.navigate("Login")}
        />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textLabel}>Title</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Eg: Open house"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(inputtitle) => setTitle(inputtitle)}
                />
              </View>

              <Text style={styles.textLabel}>Description</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.TextInput}
                  //placeholder="Eg: "
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(description) => setDescription(description)}
                />
              </View>

              <Pressable
                style={[styles.buttonAdd]}
                onPress={() => {
                  addEventToFirebase();
                }}
              >
                <Text style={styles.textStyle}>Add to new event</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonadd, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.dateBox}>
          <Text style={styles.date}>{eventDate}</Text>
          <Text>All the events on this date will show in below.</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key1}
        />

        <View>
          <TouchableOpacity style={styles.addEventBtn}>
            <Text
              style={styles.loginText}
              onPress={() => setModalVisible(!modalVisible)}
            >
              Add New Event
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

//set the styles for all the elements
const styles = StyleSheet.create({
  top: {
    height: 20,
    paddingBottom: 27,
    backgroundColor: "#F1FCFD",
  },

  container: {
    backgroundColor: "white",
  },

  date: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Montserrat",
    textShadowRadius: 50,
    textShadowColor: "grey",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    height: 500,
    width: 330,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  dateBox: {
    marginTop: 15,
    backgroundColor: "#96B4FF",
    padding: 20,
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },

  item: {
    backgroundColor: "#EBEDF1",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  titledate: {
    fontSize: 15,
    color: "#0097FF",
  },

  titleplanner: {
    fontSize: 15,
    color: "#0069B1",
  },

  titlecountdown: {
    fontSize: 15,
    color: "#FF0000",
  },

  inputField: {
    backgroundColor: "white",
    width: "90%",
    height: 40,
    marginBottom: 30,
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

  addEventBtn: {
    width: "92%",
    marginLeft: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#96B4FF",
  },

  buttonOpen: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#96B4FF",
  },
  buttonClose: {
    marginTop: 50,
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#96B4FF",
  },

  buttonAdd: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#96B4FF",
  },
});
