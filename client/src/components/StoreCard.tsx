import { Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Store } from "../types/Store";

interface StoreCardProps {
  store: Store;
  onSelect: (store: Store) => void;
}

const StoreCard = ({ store, onSelect }: StoreCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{store.logo || "🏪"}</div>
            <div>
              <h3 className="font-bold text-lg text-foreground">
                {store.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{store.rating || "4.5"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{store.estimatedTime || "15-20 min"}</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Total:</span>
              <div className="text-lg font-bold text-primary">
                ₪{store.totalPrice ? store.totalPrice.toFixed(2) : "0.00"}
              </div>
            </div>
          </div>

          {store.address && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{store.address}</span>
            </div>
          )}

          {store.distance && (
            <div className="text-sm text-muted-foreground">
              <span>📍 {store.distance}</span>
            </div>
          )}
        </div>

        <Button
          onClick={() => onSelect(store)}
          className="w-full"
          variant="default"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Select Store
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
