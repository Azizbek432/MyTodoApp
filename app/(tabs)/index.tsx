import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
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

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTaskList([
        ...taskList,
        { id: Date.now().toString(), text: task, completed: false },
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
      <View style={styles.header}>
        <Text style={styles.title}>Mening Rejalarim</Text>
      </View>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskCard, item.completed && styles.completedCard]}
            onPress={() => toggleTask(item.id)}
          >
            <Text
              style={[styles.taskText, item.completed && styles.completedText]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteBtn}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Yangi vazifa..."}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  header: { paddingTop: 60, paddingHorizontal: 20, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1a1a1a" },
  list: { paddingHorizontal: 20 },
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: "#e8f5e9",
    opacity: 0.7,
  },
  taskText: { fontSize: 16, color: "#444", width: "80%" },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteBtn: { color: "#ff4d4d", fontWeight: "bold", fontSize: 18, padding: 5 },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addBtn: {
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});
