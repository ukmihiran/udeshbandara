"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";
import type { Repository } from "@/lib/types";

export function ProjectsPanel() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRepos = () => {
    setLoading(true);
    setError(false);
    fetch("/api/repos")
      .then((r) => {
        if (!r.ok) throw new Error("Fetch failed");
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data?.repos) ? data.repos : Array.isArray(data) ? data : [];
        setRepos(list);
      })
      .catch(() => {
        setRepos([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRepos(); }, []);

  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Featured open-source repositories.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-4 space-y-3">
                <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
                <div className="h-3 w-full rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
              </Card>
            ))}
          </div>
        ) : error || repos.length === 0 ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Could not load projects.{" "}
              <a
                href="https://github.com/ukmihiran"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-accent cursor-pointer transition-colors"
              >
                View on GitHub
              </a>
            </p>
            <Button variant="outline" size="sm" onClick={fetchRepos} className="cursor-pointer border-accent/30 text-accent hover:bg-accent/10">
              <RefreshCw className="mr-2 h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer group"
              >
                <Card className="card-glow flex flex-col h-full p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                      {repo.name}
                    </h3>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow mt-2 line-clamp-2">
                    {repo.description || "No description."}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {repo.forks_count}
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
