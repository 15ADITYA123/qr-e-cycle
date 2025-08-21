import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package,
  Recycle, 
  RotateCcw,
  Leaf,
  TrendingUp,
  TrendingDown,
  ArrowUpRight
} from "lucide-react";
import { AnalyticsData } from "@/types";
import { cn } from "@/lib/utils";

interface StatsGridProps {
  data: AnalyticsData;
}

export function StatsGrid({ data }: StatsGridProps) {
  const stats = [
    {
      title: "Total E-Waste Items",
      value: data.totalItems,
      change: "+12%",
      trend: "up",
      icon: Package,
      description: "Items in system",
      color: "text-primary"
    },
    {
      title: "Items Recycled",
      value: data.itemsRecycled,
      change: "+8%", 
      trend: "up",
      icon: Recycle,
      description: "Successfully processed",
      color: "text-success"
    },
    {
      title: "Items Reused",
      value: data.itemsReused,
      change: "+15%",
      trend: "up", 
      icon: RotateCcw,
      description: "Given second life",
      color: "text-warning"
    },
    {
      title: "CO₂ Saved",
      value: `${data.co2Saved}kg`,
      change: "+22%",
      trend: "up",
      icon: Leaf,
      description: "Environmental impact",
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";
        
        return (
          <Card 
            key={stat.title}
            className="relative overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-eco transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", stat.color === "text-success" ? "bg-success/10" : stat.color === "text-warning" ? "bg-warning/10" : "bg-primary/10")}>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <Badge 
                    variant="secondary"
                    className={cn(
                      "text-xs px-2 py-1 flex items-center space-x-1",
                      isPositive 
                        ? "bg-success/10 text-success border-success/20" 
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{stat.change}</span>
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 opacity-5 bg-gradient-primary pointer-events-none" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}