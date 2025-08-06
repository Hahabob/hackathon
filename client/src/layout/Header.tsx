import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  cartItemCount?: number;
  showBackButton?: boolean;
  title?: string;
}

const Header = ({
  cartItemCount = 0,
  showBackButton = false,
  title,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const showCart =
    !location.pathname.includes("/cart") && !location.pathname.includes("/map");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Back button and title */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-primary">{title || "Twip"}</h1>
        </div>

        {/* Cart Icon */}
        {showCart && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/cart")}
            className="relative h-10 w-10"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
