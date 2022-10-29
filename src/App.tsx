import "./App.css";

import { useReducer } from "react";

import TodoHeader from "./Header/TodoHeader";
import TodoInput from "./Input/TodoInput";
import TodoListTools from "./Tools/TodoListTools";
import Divider from "./Divider/Divider";
import TodoList from "./List/TodoList";
import TodoListArea from "./List/TodoListArea";

import { todoInputReducer } from "./Todo/TodoInputReducer";
import { todoReducer } from "./Todo/TodoReducer";

function App() {
  const [inputState, inputDispatch] = useReducer(todoInputReducer, {
    text: "",
  });

  const [todoState, todoDispatch] = useReducer(todoReducer, { todos: [] });

  const handleTextChange = (text: string) => {
    inputDispatch({
      type: "change",
      payload: text,
    });
  };

  const handleSubmit = () => {
    if (!inputState.text) {
      return;
    }

    todoDispatch({
      type: "add",
      payload: { text: inputState.text },
    });

    inputDispatch({ type: "clear" });
  };

  const handleRemove = (id: number) => {
    todoDispatch({
      type: "remove",
      payload: { id: id },
    });
  };

  const handleToggle = (id: number) => {
    todoDispatch({
      type: "checked",
      payload: { id: id },
    });
  };

  const isAllChecked = () => {
    return todoState.todos.every((item) => item.isChecked);
  };

  const handleToggleAllClick = () => {
    todoDispatch({
      type: "allChecked",
      payload: isAllChecked(),
    });
  };

  const handleRemoveAllClick = () => {
    if (window.confirm("모든 todo를 삭제할까요?")) {
      todoDispatch({
        type: "allRemove",
      });
    }
  };

  return (
    <main className="App">
      <TodoHeader
        count={todoState.todos.filter((item) => !item.isChecked).length}
      />
      <TodoInput
        text={inputState.text}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />

      <TodoListArea todoCount={todoState.todos.length}>
        <TodoListTools
          isAllChecked={isAllChecked()}
          onToggleAllClick={handleToggleAllClick}
          onRemoveAllClick={handleRemoveAllClick}
        />
        <Divider />
        <TodoList
          todos={todoState.todos}
          onRemoveClick={handleRemove}
          onToggleClick={handleToggle}
        />
      </TodoListArea>
    </main>
  );
}

export default App;
