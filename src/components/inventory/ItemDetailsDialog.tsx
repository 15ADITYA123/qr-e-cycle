import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  MapPin, 
  Calendar, 
  User, 
  QrCode, 
  Download,
  Edit,
  Trash2,
  Recycle,
  RotateCcw,
  AlertTriangle
} from "lucide-react";
import { EWasteItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ItemDetailsDialogProps {
  item: EWasteItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateQR: (item: EWasteItem) => void;
  onEdit: (item: EWasteItem) => void;
  onDelete: (item: EWasteItem) => void;
}

export function ItemDetailsDialog({ 
  item, 
  open, 
  onOpenChange, 
  onGenerateQR, 
  onEdit, 
  onDelete 
}: ItemDetailsDialogProps) {
  if (!item) return null;

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
        return <Recycle className="h-5 w-5 text-success" />;
      case 'reusable':
        return <RotateCcw className="h-5 w-5 text-warning" />;
      case 'hazardous':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
    }
  };

  const statusConfig = getStatusBadge(item.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Package className="h-6 w-6" />
            <span>{item.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Category */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getCategoryIcon(item.category)}
              <div>
                <p className="font-medium capitalize">{item.category}</p>
                <p className="text-sm text-muted-foreground">Category</p>
              </div>
            </div>
            <Badge 
              variant={statusConfig.variant}
              className={cn("capitalize text-sm px-3 py-1", statusConfig.color)}
            >
              {item.status.replace('_', ' ')}
            </Badge>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Serial Number</p>
                  <p className="text-sm text-muted-foreground">{item.serialNo || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Current Holder</p>
                  <p className="text-sm text-muted-foreground">{item.currentHolder}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Age</p>
                  <p className="text-sm text-muted-foreground">{item.ageMonths} months old</p>
                </div>
              </div>

              <div>
                <p className="font-medium">Department</p>
                <Badge variant="outline" className="mt-1">
                  {item.department}
                </Badge>
              </div>

              <div>
                <p className="font-medium">Purchase Date</p>
                <p className="text-sm text-muted-foreground">
                  {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Condition Notes */}
          {item.conditionNotes && (
            <>
              <Separator />
              <div>
                <p className="font-medium mb-2">Condition Notes</p>
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 border">
                  {item.conditionNotes}
                </p>
              </div>
            </>
          )}

          {/* QR Code Section */}
          <Separator />
          <div>
            <p className="font-medium mb-3">QR Code</p>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">QR Payload</p>
                <p className="text-xs text-muted-foreground font-mono bg-muted/50 rounded px-2 py-1 mt-1">
                  {item.qrPayload}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGenerateQR(item)}
                className="flex items-center space-x-1"
              >
                <Download className="h-3 w-3" />
                <span>Download</span>
              </Button>
            </div>
          </div>

          {/* Timestamps */}
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium">Created</p>
              <p>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
            </div>
            <div>
              <p className="font-medium">Last Updated</p>
              <p>{formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <Separator />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onEdit(item)}
              className="flex items-center space-x-1"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => onDelete(item)}
              className="flex items-center space-x-1 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
            <Button
              onClick={() => onGenerateQR(item)}
              className="bg-primary hover:bg-primary/90 flex items-center space-x-1"
            >
              <QrCode className="h-4 w-4" />
              <span>Generate QR</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}