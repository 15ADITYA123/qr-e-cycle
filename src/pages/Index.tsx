import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { EWasteItemCard } from "@/components/inventory/EWasteItemCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Users,
  Trophy,
  Bell,
  Activity
} from "lucide-react";
import { mockAnalyticsData, mockEWasteItems, mockCampaigns, mockPickups } from "@/data/mockData";
import { EWasteItem } from "@/types";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
            <Button 
              variant="secondary" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add E-Waste Item
            </Button>
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
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
              {mockEWasteItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
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
              <Button variant="outline" size="sm" className="w-full mt-3">
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
          <p className="text-muted-foreground">Manage and track all electronic waste items</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-eco">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search items by name, serial, or department..." 
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEWasteItems.map((item) => (
          <EWasteItemCard
            key={item.id}
            item={item}
            onViewDetails={(item) => console.log("View details:", item)}
            onGenerateQR={(item) => console.log("Generate QR:", item)}
            onUpdateStatus={(item) => console.log("Update status:", item)}
          />
        ))}
      </div>
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