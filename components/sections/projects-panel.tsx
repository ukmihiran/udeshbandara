"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import type { Repository } from "@/lib/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function ProjectsPanel() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const didFetch = useRef(false);

  const fetchRepos = useCallback(() => {
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
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
  useEffect(() => { if (!didFetch.current) { didFetch.current = true; fetchRepos(); } }, [fetchRepos]);

  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-8">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
          <p className="text-[15px] text-muted-foreground mt-1.5">
            Featured open-source repositories.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-5 space-y-3 animate-pulse border-border/40">
                <div className="h-4 w-2/3 rounded-md bg-muted" />
                <div className="h-3 w-full rounded-md bg-muted" />
                <div className="h-3 w-1/2 rounded-md bg-muted" />
                <div className="flex gap-3 pt-2">
                  <div className="h-3 w-12 rounded-md bg-muted" />
                  <div className="h-3 w-8 rounded-md bg-muted" />
                  <div className="h-3 w-8 rounded-md bg-muted" />
                </div>
              </Card>
            ))}
          </div>
        ) : error || repos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-3 py-12"
          >
            <p className="text-[15px] text-muted-foreground">
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
            <Button variant="outline" size="sm" onClick={fetchRepos} className="cursor-pointer border-border/50 hover:bg-accent/10 hover:text-accent hover:border-accent/30 rounded-xl">
              <RefreshCw className="mr-2 h-3.5 w-3.5" /> Retry
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {repos.map((repo) => (
              <motion.div key={repo.id} variants={fadeUp}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer group h-full"
                >
                  <Card className="card-glow scanline-overlay relative overflow-hidden flex flex-col h-full p-5 border-border/40">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold truncate group-hover:text-accent transition-colors">
                        {repo.name}
                      </h3>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground flex-grow mt-2.5 line-clamp-2 leading-relaxed">
                      {repo.description || "No description."}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3.5 pt-3.5 border-t border-border/40">
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
