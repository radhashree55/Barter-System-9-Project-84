import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class NotificationScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: [],
    };
    this.requestRef = null;
  }
  getNotifications = () => {
    this.requestRef = db
      .collection("all_notifications")
      .where("notifications_status", "==", "unread")
      .where("targeted_user_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();
          notification["doc_id"] = doc.id;
          allNotifications.push(notification);
        });
        this.setState({
          allNotifications: allNotifications,
        });
      });
  };

  componentDidMount() {
    this.getNotifications();
  }

  componentWillUnmount() {
    // this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem key={i} bottomDivider>
      <Icon name="article" type="material-icons" color="#696969" />
      <ListItem.Content>
        <ListItem.Title>{item.item_name}</ListItem.Title>
        <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Notifications" navigation={this.props.navigation} />
        </View>
        <View style={{ flex: 0.9 }}>
          {this.state.allNotifications.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 25 }}>No new Notifications!</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allNotifications}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
