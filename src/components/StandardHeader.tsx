import { ArrowLeft, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface StandardHeaderProps {
  title: string;
  showBackButton?: boolean;
  backPath?: string;
}

const StandardHeader = ({ title, showBackButton = true, backPath = "/dashboard" }: StandardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backPath)}
                className="text-white/80 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="h-6 w-px bg-white/20" />
            </>
          )}
          <h1 className="text-xl font-poppins font-bold gradient-text">
            {title}
          </h1>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div className="font-orbitron font-bold text-xl gradient-text">
            FitLife AI
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StandardHeader;
