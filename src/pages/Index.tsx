import FitLifeHeader from "@/components/FitLifeHeader";
import FitLifeHero from "@/components/FitLifeHero";
import FitLifeFeatures from "@/components/FitLifeFeatures";
import FitLifeCTA from "@/components/FitLifeCTA";
import FitLifeFooter from "@/components/FitLifeFooter";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SmoothScroll />
      <FitLifeHeader />
      <main>
        <FitLifeHero />
        <FitLifeFeatures />
        <FitLifeCTA />
      </main>
      <FitLifeFooter />
    </div>
  );
};

export default Index;
