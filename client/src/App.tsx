import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import RetailLocalShops from "@/pages/retail-local-shops";
import RestaurantsCafes from "@/pages/restaurants-cafes";
import Checkout from "@/pages/checkout";
import ThankYou from "@/pages/thankyou";
import PaymentFailed from "@/pages/payment-failed";
import AdminLogin from "@/pages/admin-login";
import Admin from "@/pages/admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/retail-local-shops" component={RetailLocalShops} />
      <Route path="/restaurants-cafes" component={RestaurantsCafes} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/thankyou" component={ThankYou} />
      <Route path="/payment-failed" component={PaymentFailed} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;