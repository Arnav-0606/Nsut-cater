import { useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Minus, ShoppingCart, Clock, Leaf, Star, User } from "lucide-react";
import { menuItems, mockUser, MenuItem } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  item: MenuItem;
  quantity: number;
}

const Order = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.item.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.item.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item, quantity: 1,}]);
    }
    toast({
      title: "Added to Cart",
      description: `${item.name} added to your order`,
    });
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.item.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
    }
  };
  const getTotalAmount = () => {
    return cart.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order",
        variant: "destructive"
      });
      return;
    }
    const totalAmount = getTotalAmount();
    const orderId = `${Math.floor(Math.random() * 1000000)}`;
    const tokenNumber = Math.floor(Math.random() * 900) + 100;
    toast({
      title: "Order Placed Successfully!",
      description: `Order ID: #${orderId} | Token: ${tokenNumber}`
    });
    setCart([]);
    setIsOrderDialogOpen(false);
  };

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = cart.find(item => item.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <Layout userName={mockUser.name}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Order Food</h1>
            <p className="text-muted-foreground">Choose from our delicious menu</p>
          </div>
          <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.reduce((sum, ci) => sum + ci.quantity, 0)})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Your Order</DialogTitle>
                <DialogDescription>Review your items and place your order</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                ) : (
                  cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{cartItem.item.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{cartItem.item.price} × {cartItem.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => removeFromCart(cartItem.item.id)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{cartItem.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => addToCart(cartItem.item)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total: ₹{getTotalAmount()}</span>
                  </div>
                  <Button 
                    onClick={placeOrder} 
                    className="w-full bg-gradient-primary hover:bg-gradient-primary/90"
                  >
                  Place Order
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Items (no categories) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => {
            const quantityInCart = getItemQuantityInCart(item.id);
            return (
              <Card key={item.id} className="shadow-card hover:shadow-soft transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-current" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>


                    <div className="flex items-center gap-2">
                      {quantityInCart > 0 ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-4 py-2 bg-muted rounded text-center min-w-[3rem]">
                            {quantityInCart}
                          </span>
                          <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => addToCart(item)}
                          className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90">
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
