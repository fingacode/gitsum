"use client";

import { GithubUserData } from "./interface";
import { getUser } from "./actions";
import { ResultCard, SearchForm } from "./components";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { toast } = useToast();
  const [userData, setUserData] = useState<GithubUserData>();

  const formCallback = async (query: string) => {
    const data = await getUser(query);
    if (data) {
      setUserData(data);
    } else {
      toast({
        title: `Username "${query}" not found!`,
      });
    }
  };

  const resetState = () => {
    setUserData(undefined);
  };

  return (
    <main className="flex min-h-screen justify-center items-center md:p-24">
      <div className="flex flex-col">
        <div className="text-center pb-4">
          <h1 className="text-lg font-bold">GitSum.</h1>
          <p className="text-sm">a github profile summarizer</p>
        </div>
        {!userData ? (
          <div>
            <SearchForm callback={formCallback} />
          </div>
        ) : (
          <div>
            <ResultCard data={userData} />
            <div className="flex justify-end py-4">
              <Button onClick={resetState} variant="destructive">
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
