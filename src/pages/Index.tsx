import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { EWasteItemCard } from "@/components/inventory/EWasteItemCard";
import { AddItemDialog } from "@/components/inventory/AddItemDialog";
import { ItemDetailsDialog } from "@/components/inventory/ItemDetailsDialog";
import { QRCodeGenerator } from "@/components/inventory/QRCodeGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Users,
  Trophy,
  Bell,
  Activity,
  RotateCcw
} from "lucide-react";
import { mockAnalyticsData, mockCampaigns, mockPickups } from "@/data/mockData";
import { EWasteItem } from "@/types";
import { useInventory } from "@/hooks/useInventory";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { 
    items, 
    addItem, 
    updateItem, 
    deleteItem, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedDepartment,
    setSelectedDepartment,
    departments,
    filteredCount
  } = useInventory();
  
  const [selectedItem, setSelectedItem] = useState<EWasteItem | null>(null);
  const [qrItem, setQrItem] = useState<EWasteItem | null>(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (item: EWasteItem) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  const handleGenerateQR = (item: EWasteItem) => {
    setQrItem(item);
    setShowQRGenerator(true);
  };

  const handleEditItem = (item: EWasteItem) => {
    toast({
      title: "Edit Item",
      description: "Edit functionality will be implemented soon."
    });
  };

  const handleDeleteItem = (item: EWasteItem) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteItem(item.id);
      toast({
        title: "Item Deleted",
        description: `${item.name} has been removed from inventory.`,
      });
      setShowItemDetails(false);
    }
  };

  const handleUpdateStatus = (item: EWasteItem) => {
    const statuses = ['reported', 'pending_pickup', 'in_transit', 'recycled', 'disposed', 'reused'];
    const currentIndex = statuses.indexOf(item.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    updateItem(item.id, { status: nextStatus as EWasteItem['status'] });
    toast({
      title: "Status Updated",
      description: `${item.name} status changed to ${nextStatus.replace('_', ' ')}.`,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedDepartment('all');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset."
    });
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-xl p-8 text-white shadow-glow">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to EcoTrack Smart E-Waste Management
          </h1>
          <p className="text-white/90 mb-6">
            Track, manage, and recycle electronic waste efficiently while making a positive environmental impact.
          </p>
          <div className="flex items-center space-x-4">
            <AddItemDialog onAddItem={addItem} />
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => setActiveTab('schedule')}
            >
              Schedule Pickup
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid data={mockAnalyticsData} />

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <AnalyticsCharts data={mockAnalyticsData} />
        </div>
        
        {/* Recent Activity Sidebar */}
        <div className="space-y-6">
          {/* Recent Items */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Activity className="h-4 w-4" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.slice(0, 3).map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleViewDetails(item)}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.department}
                    </p>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => setActiveTab('inventory')}
              >
                View All Items
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Pickups */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Calendar className="h-4 w-4" />
                <span>Upcoming Pickups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPickups.map((pickup) => (
                <div key={pickup.id} className="p-3 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{pickup.vendorName}</span>
                    <Badge variant="outline" className="text-xs">
                      {pickup.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {pickup.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pickup.items.length} items
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Campaigns */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Trophy className="h-4 w-4" />
                <span>Active Campaigns</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCampaigns.slice(0, 2).map((campaign) => (
                <div key={campaign.id} className="p-3 rounded-lg border border-border bg-card">
                  <h4 className="text-sm font-medium mb-1">{campaign.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {campaign.participantCount} participants
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {campaign.itemsCollected} items
                    </Badge>
                    <span className="text-xs text-primary">Active</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">E-Waste Inventory</h2>
          <p className="text-muted-foreground">
            Manage and track all electronic waste items ({filteredCount} of {items.length + 3} total)
          </p>
        </div>
        <AddItemDialog onAddItem={addItem} />
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search items by name, serial, or department..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="recyclable">Recyclable</SelectItem>
              <SelectItem value="reusable">Reusable</SelectItem>
              <SelectItem value="hazardous">Hazardous</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="reported">Reported</SelectItem>
              <SelectItem value="pending_pickup">Pending Pickup</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="recycled">Recycled</SelectItem>
              <SelectItem value="disposed">Disposed</SelectItem>
              <SelectItem value="reused">Reused</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Clear</span>
          </Button>
        </div>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No items found</h3>
            <p className="text-muted-foreground">Add your first e-waste item to get started.</p>
            <AddItemDialog onAddItem={addItem} />
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <EWasteItemCard
              key={item.id}
              item={item}
              onViewDetails={handleViewDetails}
              onGenerateQR={handleGenerateQR}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <ItemDetailsDialog
        item={selectedItem}
        open={showItemDetails}
        onOpenChange={setShowItemDetails}
        onGenerateQR={handleGenerateQR}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      <QRCodeGenerator
        item={qrItem}
        open={showQRGenerator}
        onOpenChange={setShowQRGenerator}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "inventory":
        return renderInventory();
      case "vendors":
        return <div className="text-center py-12"><h2 className="text-xl text-muted-foreground">Vendor Management - Coming Soon</h2></div>;
      case "campaigns":
        return <div className="text-center py-12"><h2 className="text-xl text-muted-foreground">Campaigns Management - Coming Soon</h2></div>;
      case "schedule":
        return <div className="text-center py-12"><h2 className="text-xl text-muted-foreground">Schedule Management - Coming Soon</h2></div>;
      case "settings":
        return <div className="text-center py-12"><h2 className="text-xl text-muted-foreground">Settings - Coming Soon</h2></div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;