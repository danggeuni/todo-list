import "./App.css";

import { useState } from "react";

import TodoHeader from "./Header/TodoHeader";
import TodoInput from "./Input/TodoInput";
import TodoListTools from "./Tools/TodoListTools";
import Divider from "./Divider/Divider";
import TodoList from "./List/TodoList";
import TodoListArea from "./List/TodoListArea";

export type TodoType = {
  id: number;
  text: string;
  isChecked: boolean;
};

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleTextChange = (text: string) => {
    setText(text);
  };

  const handleSubmit = () => {
    if (!text) {
      return;
    }
    const newTodos = todos.concat({
      id: Date.now(),
      text: text,
      isChecked: false,
    });

    setTodos(newTodos);

    setText("");
  };

  const handleRemove = (id: number) => {
    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleToggle = (id: number) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const isAllChecked = () => {
    return todos.every((item) => item.isChecked);
  };

  const handleToggleAllClick = () => {
    const AllChecked = isAllChecked();

    const newTodo = todos.map((item) => {
      return {
        ...item,
        isChecked: !AllChecked,
      };
    });
    setTodos(newTodo);
  };

  const handleRemoveAllClick = () => {
    if (window.confirm("모든 todo를 삭제할까요?")) {
      setTodos([]);
    }
  };

  return (
    <main className="App">
      <TodoHeader count={todos.filter((item) => !item.isChecked).length} />
      <TodoInput
        text={text}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />

      <TodoListArea todoCount={todos.length}>
        <TodoListTools
          isAllChecked={isAllChecked()}
          onToggleAllClick={handleToggleAllClick}
          onRemoveAllClick={handleRemoveAllClick}
        />
        <Divider />
        <TodoList
          todos={todos}
          onRemoveClick={handleRemove}
          onToggleClick={handleToggle}
        />
      </TodoListArea>
    </main>
  );
}

export default App;
