import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class ExchangeScreen extends Component {
  constructor() {
    super();
    this.state = {
      userName: firebase.auth().currentUser.email,
      itemName: "",
      itemDescription: "",
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addItem = (itemName, itemDescription) => {
    var userName = this.state.userName;
    var randomRequestId = this.createUniqueId();
    db.collection("items_for_exchange").add({
      user_name: userName,
      item_name: itemName,
      item_description: itemDescription,
      request_id: randomRequestId,
    });

    this.setState({
      itemName: "",
      itemDescription: "",
    });

    return Alert.alert("Item listed for Exchange!");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Request Items" navigation={this.props.navigation} />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginTop: -60,
              marginBottom: 30,
            }}
          >
            Add an Item for Exchange with Others!
          </Text>
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Item Name"}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                itemName: text,
              });
            }}
            value={this.state.itemName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 350 }]}
            multiline
            numberOfLines={15}
            placeholder={"Item Description"}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                itemDescription: text,
              });
            }}
            value={this.state.itemDescription}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addItem(this.state.itemName, this.state.itemDescription);
            }}
          >
            <Text
              style={{
                color: "mediumorchid",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Add Item
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "mediumorchid",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "lavender",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
