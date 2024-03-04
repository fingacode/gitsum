import { GithubRepoData, GithubUserData } from "../interface";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge, badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProjects } from "../actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiExternalLink } from "react-icons/fi";

import { Skeleton } from "@/components/ui/skeleton";

export default function ResultCard(props: { data: GithubUserData }) {
  const [repos, setRepos] = useState<[GithubRepoData]>();
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    if(!repos){
      const data = await getProjects(props.data.login);
      if (data) {
        setRepos(data);
        setLoading(false);
      }
    } else {
      console.log('hit')
    }
  };

  useEffect(() => {
    loadProjects();
  });

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row">
            <div className="pr-4">
              <Avatar>
                <AvatarImage src={props.data.avatar_url} />
                <AvatarFallback>
                  {props.data.name ? props.data.name : props.data.login}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              {props.data.name ? props.data.name : props.data.login}
              <div className="flex flex-row py-2">
                <Link
                  href={props.data.html_url}
                  className={badgeVariants({ variant: "outline" })}
                  target="_blank"
                >
                  {props.data.html_url}
                  <FiExternalLink className="ml-2 float-right" />
                </Link>
              </div>
              <Badge>
                Joined: {new Date(props.data.created_at).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="pt-4 pb-0 px-4">
          <h3>Public Repositories</h3>
        </div>
        <ScrollArea className="h-72 w-full rounded-md mt-4">
          <div className="p-4">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((item, index) => (
                    <div key={index}>
                      <div>
                        <Skeleton className="w-full h-[20px] rounded-full" />
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))
              : repos?.map((repo, id) => (
                  <div key={id}>
                    <div className="text-sm">
                      <Badge variant="outline">
                        {new Date(repo.created_at).toLocaleDateString()}
                      </Badge>{" "}
                      {repo.name}
                      <Link
                        href={repo.html_url}
                        target="_blank"
                        title={`View ${repo.name} on github`}
                      >
                        <FiExternalLink className="float-right" />
                      </Link>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
