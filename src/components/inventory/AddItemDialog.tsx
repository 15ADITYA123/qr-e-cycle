import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package } from "lucide-react";
import { EWasteCategory } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AddItemDialogProps {
  onAddItem: (item: any) => void;
}

export function AddItemDialog({ onAddItem }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    category: "" as EWasteCategory,
    department: "",
    location: "",
    serialNo: "",
    purchaseDate: "",
    conditionNotes: "",
    currentHolder: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ageMonths = formData.purchaseDate 
        ? Math.floor((new Date().getTime() - new Date(formData.purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
        : 0;

      const newItem = {
        id: Date.now().toString(),
        ...formData,
        ageMonths,
        status: "reported" as const,
        qrPayload: `ITEM:${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      onAddItem(newItem);
      
      toast({
        title: "Item Added Successfully",
        description: `${formData.name} has been added to the inventory.`,
      });

      setFormData({
        name: "",
        category: "" as EWasteCategory,
        department: "",
        location: "",
        serialNo: "",
        purchaseDate: "",
        conditionNotes: "",
        currentHolder: ""
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-eco">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Add E-Waste Item</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Dell Laptop"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value: EWasteCategory) => setFormData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recyclable">Recyclable</SelectItem>
                  <SelectItem value="reusable">Reusable</SelectItem>
                  <SelectItem value="hazardous">Hazardous</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="e.g. Computer Science"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Lab 301, CS Building"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNo">Serial Number</Label>
              <Input
                id="serialNo"
                value={formData.serialNo}
                onChange={(e) => setFormData(prev => ({ ...prev, serialNo: e.target.value }))}
                placeholder="e.g. DL5021XP"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentHolder">Current Holder</Label>
            <Input
              id="currentHolder"
              value={formData.currentHolder}
              onChange={(e) => setFormData(prev => ({ ...prev, currentHolder: e.target.value }))}
              placeholder="e.g. Prof. Kumar"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditionNotes">Condition Notes</Label>
            <Textarea
              id="conditionNotes"
              value={formData.conditionNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, conditionNotes: e.target.value }))}
              placeholder="Describe the current condition of the item..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? "Adding..." : "Add Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}