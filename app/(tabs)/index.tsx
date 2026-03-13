import { Ionicons } from "@expo/vector-icons"; // Ikonkalar kutubxonasi
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);

  useEffect(() => {
    loadTasks();
  }, []);
  useEffect(() => {
    saveTasks(taskList);
  }, [taskList]);

  const saveTasks = async (tasks: any) => {
    try {
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (e) {
      console.log(e);
    }
  };

  const loadTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@tasks");
      if (jsonValue !== null) setTaskList(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTaskList([
        { id: Date.now().toString(), text: task, completed: false },
        ...taskList,
      ]);
      setTask("");
      Keyboard.dismiss();
    }
  };

  const toggleTask = (id: string) => {
    setTaskList(
      taskList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Yuqori qism (Header) */}
      <View style={styles.header}>
        <Text style={styles.title}>Mening Kunim</Text>
        <Text style={styles.subtitle}>{taskList.length} ta vazifa bor</Text>
      </View>

      {/* Ro'yxat */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[styles.taskCard, item.completed && styles.completedCard]}
          >
            <TouchableOpacity
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? "#4CAF50" : "#6C63FF"}
              />
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.deleteIcon}
            >
              <Ionicons name="trash-outline" size={20} color="#FF5252" />
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Nima qilish kerak?"}
            placeholderTextColor="#999"
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={handleAddTask} style={styles.addBtn}>
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE" },
  header: { paddingTop: 70, paddingHorizontal: 30, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "800", color: "#2D3436" },
  subtitle: { fontSize: 16, color: "#A0A0A0", marginTop: 5 },
  list: { paddingHorizontal: 25 },
  taskCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  completedCard: { backgroundColor: "#F1F2F6", elevation: 0 },
  taskContent: { flexDirection: "row", alignItems: "center", flex: 1 },
  taskText: {
    fontSize: 17,
    color: "#2D3436",
    marginLeft: 12,
    fontWeight: "500",
  },
  completedText: { textDecorationLine: "line-through", color: "#B2BEC3" },
  deleteIcon: { padding: 5 },
  inputWrapper: { paddingBottom: 30, paddingTop: 10 },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 25,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 20,
    alignItems: "center",
    height: 60,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  input: { flex: 1, fontSize: 16, color: "#2D3436" },
  addBtn: {
    backgroundColor: "#6C63FF",
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});
