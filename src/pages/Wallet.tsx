import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet as WalletIcon, CreditCard, Plus, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { mockUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'debit',
    amount: 180,
    description: 'Order #ORD001 - Vegetable Biryani + Drinks',
    date: new Date('2024-01-15T12:30:00'),
    status: 'completed'
  },
  {
    id: 'TXN002',
    type: 'credit',
    amount: 500,
    description: 'Wallet Recharge - UPI Payment',
    date: new Date('2024-01-14T16:45:00'),
    status: 'completed'
  },
  {
    id: 'TXN003',
    type: 'debit',
    amount: 190,
    description: 'Order #ORD003 - Masala Dosa + Lime Soda',
    date: new Date('2024-01-14T08:15:00'),
    status: 'completed'
  },
  {
    id: 'TXN004',
    type: 'credit',
    amount: 1000,
    description: 'Wallet Recharge - Card Payment',
    date: new Date('2024-01-13T14:20:00'),
    status: 'completed'
  },
  {
    id: 'TXN005',
    type: 'debit',
    amount: 150,
    description: 'Order #ORD002 - Chicken Curry',
    date: new Date('2024-01-12T19:30:00'),
    status: 'completed'
  }
];

const Wallet = () => {
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const { toast } = useToast();

  const quickAmounts = [100, 200, 500, 1000];

  const handleRecharge = () => {
    const amount = parseFloat(rechargeAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to recharge",
        variant: "destructive"
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "Payment Processing",
      description: "Please wait while we process your payment...",
    });

    setTimeout(() => {
      toast({
        title: "Recharge Successful!",
        description: `₹${amount} has been added to your wallet`,
      });
      setRechargeAmount('');
      setIsRechargeDialogOpen(false);
    }, 2000);
  };

  const getTotalSpent = () => {
    return mockTransactions
      .filter(txn => txn.type === 'debit')
      .reduce((total, txn) => total + txn.amount, 0);
  };

  const getTotalRecharged = () => {
    return mockTransactions
      .filter(txn => txn.type === 'credit')
      .reduce((total, txn) => total + txn.amount, 0);
  };

  return (
    <Layout userName={mockUser.name}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
            <p className="text-muted-foreground">Manage your digital wallet and transactions</p>
          </div>
          <Dialog open={isRechargeDialogOpen} onOpenChange={setIsRechargeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Recharge Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Recharge Your Wallet</DialogTitle>
                <DialogDescription>Add money to your digital wallet using secure payment methods</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Recharge Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Quick Amount</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {quickAmounts.map(amount => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setRechargeAmount(amount.toString())}
                        className="h-12"
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      variant={selectedPaymentMethod === 'upi' ? 'default' : 'outline'}
                      onClick={() => setSelectedPaymentMethod('upi')}
                      className="h-12"
                    >
                      UPI
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setSelectedPaymentMethod('card')}
                      className="h-12"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Card
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleRecharge}
                  className="w-full bg-gradient-primary hover:bg-gradient-primary/90"
                  disabled={!rechargeAmount}
                >
                  Recharge ₹{rechargeAmount || '0'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Wallet Balance Card */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-foreground">
              <WalletIcon className="h-6 w-6" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">₹{mockUser.walletBalance.toLocaleString()}</div>
            <p className="text-primary-foreground/80">Available for orders</p>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">₹{getTotalSpent()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recharged</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{getTotalRecharged()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{Math.round(getTotalSpent() / mockTransactions.filter(t => t.type === 'debit').length)}</div>
              <p className="text-xs text-muted-foreground">Per order</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent wallet transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date.toLocaleDateString()} • {transaction.date.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </p>
                    <Badge variant={
                      transaction.status === 'completed' ? 'secondary' :
                      transaction.status === 'pending' ? 'default' : 'destructive'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Wallet;