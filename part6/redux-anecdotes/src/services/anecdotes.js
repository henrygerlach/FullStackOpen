const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};

const createNew = async (content) => {
  const options = {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: content, votes: 0 }),
  };

  const response = await fetch(baseURL, options);

  if (!response.ok) {
    throw new Error("Failed to post new anecdote");
  }

  return await response.json();
};

const vote = async (id) => {
  const anecdoteReponse = await fetch(`${baseURL}/${id}`);

  if (!anecdoteReponse.ok) {
    throw new Error(`Failed to fetch anecdote with id: ${id}`);
  }

  const anecdote = await anecdoteReponse.json();

  const options = {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  };

  const updateResponse = await fetch(`${baseURL}/${id}`, options);

  if (!updateResponse.ok) {
    throw new Error(`Failed to update anecdote with id: ${id}`);
  }

  return await updateResponse.json();
};

export default { getAll, createNew, vote };
