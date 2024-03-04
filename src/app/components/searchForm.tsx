"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchForm({ callback }: { callback: any }) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (!username) throw new Error("Username not provided");
    callback(username);
  };

  // TODO: error handling in child instead of parent.

  return (
    <form action={handleSubmit}>
      <div className="flex md:w-full max-w-sm items-center">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a Github Username"
          className="rounded-none rounded-l-lg"
        />
        <Button type="submit" disabled={!username} className="rounded-none rounded-r-lg">
          Search
        </Button>
      </div>
    </form>
  );
}
