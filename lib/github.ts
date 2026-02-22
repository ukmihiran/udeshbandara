import { Octokit } from "@octokit/rest";
import { Repository } from "./types";

const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
const octokit = new Octokit(token ? { auth: token } : {});

export async function getFeaturedRepos(): Promise<Repository[]> {
  try {
    const { data } = await octokit.request('GET /users/{username}/repos', {
      username: 'ukmihiran',
      sort: 'pushed',
      per_page: 8, // Fetching a few more to showcase
    });
    return data as Repository[];
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}