import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Clock, CheckCircle, AlertCircle, Users, TrendingUp, Timer } from "lucide-react";
import { mockOrders, Order } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Kitchen = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, pickupTime: newStatus === 'ready' ? new Date() : order.pickupTime }
          : order
      )
    );
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} marked as ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed': return 'outline';
      case 'preparing': return 'default';
      case 'ready': return 'secondary';
      case 'delivered': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusBgClass = (status: string) => {
    switch (status) {
      case 'placed': return '';
      case 'preparing': return 'bg-gradient-primary';
      case 'ready': return 'bg-gradient-success';
      case 'delivered': return 'bg-gradient-success';
      default: return '';
    }
  };

  const getOrderAge = (orderTime: Date) => {
    const diffMs = currentTime.getTime() - orderTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins;
  };
  const pendingOrders = orders.filter(order => order.status === 'placed');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');

  const todayStats = {
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 'delivered').length,
    avgPrepTime: 18, // minutes
    revenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
  };

  return (
    <Layout userRole="staff" userName="Chef Maria">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <ChefHat className="h-6 w-6" />
                Kitchen Display System
              </h1>
              <p className="text-primary-foreground/80">Live order management dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-foreground/80">Current Time</p>
              <p className="text-xl font-bold">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{pendingOrders.length + preparingOrders.length}</div>
              <p className="text-xs text-muted-foreground">In queue</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready for Pickup</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{readyOrders.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting collection</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Prep Time</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{todayStats.avgPrepTime}m</div>
              <p className="text-xs text-muted-foreground">Today's average</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{todayStats.revenue}</div>
              <p className="text-xs text-muted-foreground">{todayStats.totalOrders} orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Order Management Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="relative">
              New Orders
              {pendingOrders.length > 0 && (
                <Badge className="ml-2 bg-destructive text-destructive-foreground">
                  {pendingOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="preparing" className="relative">
              In Progress
              {preparingOrders.length > 0 && (
                <Badge className="ml-2 bg-gradient-primary">
                  {preparingOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ready" className="relative">
              Ready for Pickup
              {readyOrders.length > 0 && (
                <Badge className="ml-2 bg-gradient-success">
                  {readyOrders.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingOrders.length === 0 ? (
                <Card className="shadow-card col-span-full">
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No new orders to prepare right now</p>
                  </CardContent>
                </Card>
              ) : (
                pendingOrders.map(order => {
                  const orderAge = getOrderAge(order.orderTime);
                  const isUrgent = orderAge > 10;

                  return (
                    <Card key={order.id} className={`shadow-card hover:shadow-soft transition-all duration-200 ${isUrgent ? 'ring-2 ring-destructive' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              Order #{order.id}
                              {isUrgent && <AlertCircle className="h-4 w-4 text-destructive animate-pulse-soft" />}
                            </CardTitle>
                            <CardDescription>
                              Token: {order.tokenNumber} • {order.userName} • {order.mealType} • {orderAge} mins ago
                            </CardDescription>
                          </div>
                          <Badge variant={getStatusColor(order.status)} className={getStatusBgClass(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-sm bg-muted/30 rounded p-2">
                                <div>
                                  <span className="font-medium">{item.menuItem.name}</span>
                                  <span className="text-muted-foreground ml-2">×{item.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t">
                            <Button 
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                              className="bg-gradient-primary hover:bg-gradient-primary/90"
                            >
                              Start Preparing
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="preparing" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {preparingOrders.length === 0 ? (
                <Card className="shadow-card col-span-full">
                  <CardContent className="py-12 text-center">
                    <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No orders in preparation</h3>
                    <p className="text-muted-foreground">Orders will appear here when you start preparing them</p>
                  </CardContent>
                </Card>
              ) : (
                preparingOrders.map(order => {
                  const orderAge = getOrderAge(order.orderTime);
                  return (
                    <Card key={order.id} className="shadow-card hover:shadow-soft transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Order #{order.id}</CardTitle>
                            <CardDescription>
                              Token: {order.tokenNumber} • {order.userName} • {order.mealType} • Preparing for {orderAge} mins
                            </CardDescription>
                          </div>
                          <Badge variant={getStatusColor(order.status)} className={getStatusBgClass(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-sm bg-muted/30 rounded p-2">
                                <div>
                                  <span className="font-medium">{item.menuItem.name}</span>
                                  <span className="text-muted-foreground ml-2">×{item.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                                                 
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="text-sm text-muted-foreground">
                              Est. completion: {Math.max(0, estimatedTime - orderAge)} mins
                            </div>
                            <Button 
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="bg-gradient-success hover:bg-gradient-success/90"
                            >
                              Mark Ready
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="ready" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {readyOrders.length === 0 ? (
                <Card className="shadow-card col-span-full">
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No orders ready for pickup</h3>
                    <p className="text-muted-foreground">Completed orders will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                readyOrders.map(order => {
                  const waitingTime = order.pickupTime ? getOrderAge(order.pickupTime) : 0;

                  return (
                    <Card key={order.id} className="shadow-card hover:shadow-soft transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Order #{order.id}</CardTitle>
                            <CardDescription>
                              Token: {order.tokenNumber} • {order.userName} • {order.mealType} • Ready for {waitingTime} mins
                            </CardDescription>
                          </div>
                          <Badge variant={getStatusColor(order.status)} className={getStatusBgClass(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-sm bg-success/10 rounded p-2">
                                <div>
                                  <span className="font-medium">{item.menuItem.name}</span>
                                  <span className="text-muted-foreground ml-2">×{item.quantity}</span>
                                </div>
                                <CheckCircle className="h-4 w-4 text-success" />
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="text-sm font-medium text-success">
                              QR Code: {order.qrCode}
                            </div>
                            <Button 
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              variant="outline"
                            >
                              Mark Delivered
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Kitchen;