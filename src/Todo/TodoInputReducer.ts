type TodoInputStateType = {
  text: string;
};

type TodoInputActionType =
  | {
      type: "change";
      data: string;
    }
  | {
      type: "clear";
    };

export const todoInputReducer = (
  state: TodoInputStateType,
  action: TodoInputActionType
) => {
  switch (action.type) {
    case "change":
      return {
        text: action.data,
      };

    case "clear":
      return {
        text: "",
      };
  }
};
