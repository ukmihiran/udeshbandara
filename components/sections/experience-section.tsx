import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCES } from "@/lib/data";
import { Building2, MapPin, Calendar } from "lucide-react";

export function ExperiencePanel() {
  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
          <p className="text-sm text-muted-foreground mt-1">
            4+ years across offensive security, consulting, and research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXPERIENCES.map((exp, i) => (
            <Card
              key={i}
              className="card-glow group p-4 border-l-2 border-l-accent/40 hover:border-l-accent cursor-default"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-medium leading-tight">{exp.role}</h3>
                {exp.current && (
                  <Badge className="text-[10px] px-1.5 py-0 bg-accent/15 text-accent border-accent/30">
                    Current
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0 text-accent/60" />
                <span>{exp.company}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3 shrink-0" />
                  {exp.period}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {exp.location}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
