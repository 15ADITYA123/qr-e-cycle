import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  QrCode, 
  MapPin, 
  Calendar,
  User,
  Package,
  MoreHorizontal,
  Recycle,
  RotateCcw,
  AlertTriangle
} from "lucide-react";
import { EWasteItem } from "@/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface EWasteItemCardProps {
  item: EWasteItem;
  onViewDetails?: (item: EWasteItem) => void;
  onGenerateQR?: (item: EWasteItem) => void;
  onUpdateStatus?: (item: EWasteItem) => void;
}

export function EWasteItemCard({ 
  item, 
  onViewDetails, 
  onGenerateQR, 
  onUpdateStatus 
}: EWasteItemCardProps) {
  
  const getStatusBadge = (status: EWasteItem['status']) => {
    const variants = {
      reported: { variant: "secondary" as const, color: "text-muted-foreground" },
      pending_pickup: { variant: "default" as const, color: "text-warning" },
      in_transit: { variant: "default" as const, color: "text-primary" },
      recycled: { variant: "default" as const, color: "text-success" },
      disposed: { variant: "destructive" as const, color: "text-destructive-foreground" },
      reused: { variant: "default" as const, color: "text-success" }
    };
    
    return variants[status];
  };

  const getCategoryIcon = (category: EWasteItem['category']) => {
    switch (category) {
      case 'recyclable':
        return <Recycle className="h-4 w-4 text-success" />;
      case 'reusable':
        return <RotateCcw className="h-4 w-4 text-warning" />;
      case 'hazardous':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const statusConfig = getStatusBadge(item.status);

  return (
    <Card className="bg-gradient-card border-0 shadow-card hover:shadow-eco transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              {item.name}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {getCategoryIcon(item.category)}
              <Badge 
                variant={statusConfig.variant}
                className={cn("capitalize", statusConfig.color)}
              >
                {item.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-1">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Item Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>Serial: {item.serialNo}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{item.currentHolder}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{item.ageMonths} months old</span>
          </div>
        </div>

        {/* Department Badge */}
        <Badge variant="outline" className="w-fit">
          {item.department}
        </Badge>

        {/* Condition Notes */}
        {item.conditionNotes && (
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-2 border border-border">
            {item.conditionNotes}
          </p>
        )}

        {/* Last Updated */}
        <div className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(item)}
          >
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center space-x-1"
            onClick={() => onGenerateQR?.(item)}
          >
            <QrCode className="h-3 w-3" />
            <span>QR</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}