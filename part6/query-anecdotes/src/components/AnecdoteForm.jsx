import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAnecdote } from "../requests";
import NotificationContext from "./NotificationContextProvider";

const AnecdoteForm = () => {
  const { setNotification } = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(anecdote));
    },
    onError: () => {
      setNotification("too short anecdote, must have length 5 or more");
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({
      content: content,
      votes: 0,
    });
    setNotification(`anecdote "${content}" created`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
