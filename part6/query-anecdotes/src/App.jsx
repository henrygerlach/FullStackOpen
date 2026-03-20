import { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import NotificationContext from "./components/NotificationContextProvider";
import { getAll, voteAnecdote } from "./requests";

const App = () => {
  const { setNotification } = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        [...anecdotes.filter((a) => a.id !== anecdote.id), anecdote],
      );
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    voteMutation.mutate(votedAnecdote);
    setNotification(`anecdote "${anecdote.content}" voted`);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
