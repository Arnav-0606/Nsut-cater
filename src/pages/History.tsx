import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History as HistoryIcon, QrCode, Star, Download, Search, Filter } from "lucide-react";
import { mockOrders, mockUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0]);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const { toast } = useToast();

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedTab === 'all') return matchesSearch;
    return matchesSearch && order.status === selectedTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'secondary';
      case 'ready': return 'default';
      case 'preparing': return 'default';
      case 'placed': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBgClass = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-gradient-success';
      case 'ready': return 'bg-gradient-success';
      case 'preparing': return 'bg-gradient-primary';
      case 'placed': return '';
      default: return '';
    }
  };

  const downloadReceipt = (order: any) => {
    toast({
      title: "Downloading Receipt",
      description: `Receipt for order ${order.id} is being downloaded`,
    });
  };

  const rateOrder = (orderId: string, rating: number) => {
    toast({
      title: "Thank you for your feedback!",
      description: `You rated order ${orderId} with ${rating} stars`,
    });
  };

  const generateQRCode = (order: any) => {
    // In a real app, this would generate an actual QR code
    const qrData = `NSUTcater-Order-${order.id}-Token-${order.tokenNumber}`;
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="black"/>
        <rect x="30" y="30" width="140" height="140" fill="white"/>
        <text x="100" y="95" text-anchor="middle" font-family="Arial" font-size="10" fill="black">
          ${order.id}
        </text>
        <text x="100" y="115" text-anchor="middle" font-family="Arial" font-size="10" fill="black">
          Token: ${order.tokenNumber}
        </text>
      </svg>
    `)}`;
  };

  return (
    <Layout userName={mockUser.name}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Order History</h1>
            <p className="text-muted-foreground">Track your past orders and download receipts</p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by ID or item name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="placed">Placed</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <Card className="shadow-card">
                  <CardContent className="py-12 text-center">
                    <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? 'Try adjusting your search terms' : 'You haven\'t placed any orders yet'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredOrders.map(order => (
                  <Card key={order.id} className="shadow-card hover:shadow-soft transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Order #{order.id}
                            <Badge 
                              variant={getStatusColor(order.status)}
                              className={getStatusBgClass(order.status)}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {order.orderTime.toLocaleDateString()} at {order.orderTime.toLocaleTimeString()} • {order.mealType}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">₹{order.totalAmount}</p>
                          <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div className="flex-1">
                                <span className="font-medium">{item.menuItem.name}</span>
                                {item.customizations && item.customizations.length > 0 && (
                                  <span className="text-muted-foreground ml-2">
                                    ({item.customizations.join(', ')})
                                  </span>
                                )}
                              </div>
                              <div className="text-right">
                                <span>₹{item.menuItem.price} × {item.quantity}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-4 border-t">
                          <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <QrCode className="h-4 w-4 mr-2" />
                                Show QR
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Order QR Code</DialogTitle>
                                <DialogDescription>
                                  Show this QR code at the pickup counter for order #{selectedOrder.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex flex-col items-center space-y-4">
                                <img 
                                  src={generateQRCode(selectedOrder)} 
                                  alt={`QR Code for order ${selectedOrder.id}`}
                                  className="w-48 h-48 border rounded-lg"
                                />
                                <div className="text-center">
                                  <p className="font-mono text-lg">{selectedOrder.qrCode}</p>
                                  <p className="text-sm text-muted-foreground">Order ID: {selectedOrder.id}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadReceipt(order)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>

                          {order.status === 'delivered' && (
                            <div className="flex items-center gap-1 ml-auto">
                              <span className="text-sm text-muted-foreground mr-2">Rate:</span>
                              {[1, 2, 3, 4, 5].map(rating => (
                                <Button
                                  key={rating}
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-auto"
                                  onClick={() => rateOrder(order.id, rating)}
                                >
                                  <Star className="h-4 w-4 text-accent fill-current" />
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default History;