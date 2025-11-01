import React from "react";
import { IconButton, Card, CardContent } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Item } from "./Item";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white">
      <CardContent className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Created: {item.createdDate}
          </p>
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="text-gray-600">{item.subtitle}</p>
        </div>

        <div className="flex gap-1">
          <IconButton color="primary" onClick={() => onEdit(item)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(item)}>
            <Delete />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
