const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await fetch(baseURL);
  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }
  return await response.json();
};

export const createAnecdote = async (anecdote) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };

  const response = await fetch(baseURL, options);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

export const voteAnecdote = async (anecdote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };

  const response = await fetch(`${baseURL}/${anecdote.id}`, options);

  if (!response.ok) {
    throw new Error("Failed to vote anecdote");
  }

  return await response.json();
};
