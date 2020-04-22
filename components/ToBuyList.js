import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Colors from "../Colors";
import ToBuyModal from "./ToBuyModal";

export default class ToBuyList extends React.Component {
  state = {
    showListVariable: false,
  };

  toggleListModel() {
    this.setState({ showListVariable: !this.state.showListVariable });
  }

  render() {
    const list = this.props.list;
    const completedCount = list.items.filter((item) => item.completed).length;
    const remainingCount = list.items.length - completedCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVariable}
          onRequestClose={() => this.toggleListModel()}
        >
          <ToBuyModal
            list={list}
            closeModal={() => this.toggleListModel()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModel()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Não feito</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Feito</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
