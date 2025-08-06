import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/products")}>
        navigate to products
      </Button>
    </div>
  );
}
