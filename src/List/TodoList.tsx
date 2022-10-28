import { TodoType } from "../App";
import TodoItem from "../ListItem/TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: TodoType[];
  onToggleClick: (id: number) => void;
  onRemoveClick: (id: number) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <section>
      <ol className={styles.olContainer}>
        {props.todos.map((item) => (
          <TodoItem
            id={item.id}
            key={item.id}
            text={item.text}
            isChecked={item.isChecked}
            onToggleClick={props.onToggleClick}
            onRemoveClick={props.onRemoveClick}
          />
        ))}
      </ol>
    </section>
  );
};

export default TodoList;
