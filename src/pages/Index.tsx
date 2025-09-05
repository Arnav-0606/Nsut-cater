import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, TrendingUp, Users, Star, Leaf } from "lucide-react";
import { mockUser, mockOrders } from "@/data/mockData";

const Index = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedMeal, setSelectedMeal] = useState('lunch');
  
  const today = new Date();
  const todayOrders = mockOrders.filter(order => 
    order.orderTime.toDateString() === today.toDateString()
  );
  return (
    <Layout userName={mockUser.name}>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to NSUTcater, {mockUser.name}!</h1>
              <p className="text-primary-foreground/80">NSUT Student Centre</p>
            </div>

          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{todayOrders.length}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">12</div>
              <p className="text-xs text-muted-foreground">Total orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Orders
            </CardTitle>
            <CardDescription>Your latest food orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 3).map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} items • ₹{order.totalAmount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.orderTime.toLocaleString()}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      order.status === 'ready' ? 'secondary' :
                      order.status === 'preparing' ? 'default' : 'outline'
                    }
                    className={
                      order.status === 'ready' ? 'bg-gradient-success' :
                      order.status === 'preparing' ? 'bg-gradient-primary' : ''
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
