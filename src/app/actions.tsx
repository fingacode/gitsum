"use server";

// store in env
const apiURL = "https://api.github.com";

export async function getUser(username: string | undefined) {
  if (!username) throw new Error("Username not provided");

  const result = await fetch(`${apiURL}/users/${username}`);

  if (!result.ok) {
    return null;
  }

  return await result.json();
}

export async function getProjects(username: string | undefined) {
  if (!username) throw new Error("Username not provided");

  const result = await fetch(`${apiURL}/users/${username}/repos?sort=updated`);

  if (!result.ok) {
    return null;
  }

  return await result.json();
}