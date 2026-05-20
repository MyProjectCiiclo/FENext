import { githubService } from "@/services";
import { GithubUser, GithubContribution } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export function useGithub() {
  const [loading, setLoading] = useState(false);

  const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
  const [contributions, setContributions] = useState<GithubContribution | null>(
    null,
  );

  const getGithub = async () => {
    setLoading(true);

    try {
      const [userRes, contributionRes] = await Promise.all([
        githubService.getGithubUser(),
        githubService.getContributions(),
      ]);

      setGithubUser(userRes.data);
      setContributions(contributionRes.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    githubUser,
    contributions,
    getGithub,
  };
}
