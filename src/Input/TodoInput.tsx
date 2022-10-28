import styles from "./TodoInput.module.css";

import { RiChatNewLine } from "react-icons/ri";

interface TodoInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
}

const TodoInput = (props: TodoInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onTextChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <section className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder={"해야할 Todo"}
          value={props.text}
          onChange={handleInputChange}
        />
        <button className={styles.enter}>
          <RiChatNewLine />
        </button>
      </form>
    </section>
  );
};

export default TodoInput;
