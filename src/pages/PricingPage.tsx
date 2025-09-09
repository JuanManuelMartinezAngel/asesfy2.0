import Header from "@/components/Header";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingPlans from "@/components/pricing/PricingPlans";
import TrustSection from "@/components/pricing/TrustSection";
import PricingFooter from "@/components/pricing/PricingFooter";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <PricingHeader />
      <PricingPlans />
      <TrustSection />
      <PricingFooter />
    </div>
  );
};

export default PricingPage;