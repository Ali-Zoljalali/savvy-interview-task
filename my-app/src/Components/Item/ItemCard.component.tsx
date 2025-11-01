import React from "react";
import { IconButton, Card, CardContent, Tooltip } from "@mui/material";
import { Edit, Delete, CalendarToday } from "@mui/icons-material";
import { Item } from "./Item";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <Card
      className="
     !rounded-2xl !shadow-sm 
    hover:!shadow-xl 
    !transition-all !duration-300 
    !bg-gradient-to-br !from-white !to-gray-50 
    !border !border-gray-100 
    hover:!-translate-y-1
      "
    >
      <CardContent className="flex justify-between items-start sm:items-center gap-4 p-5">
        <div className="flex-1">
          <div className="flex items-center text-gray-400 text-xs mb-2 gap-1">
            <CalendarToday fontSize="inherit" />
            <span>{item.createdDate}</span>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 tracking-tight mb-1">
            {item.title}
          </h3>

          <p className="text-gray-600 text-sm leading-snug">{item.subtitle}</p>
        </div>

        <div className="flex gap-2">
          <Tooltip title="Edit" arrow>
            <IconButton
              onClick={() => onEdit(item)}
              className="!hover:bg-blue-50 !text-blue-600 !transition-colors"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              onClick={() => onDelete(item)}
              className="!hover:bg-red-50 !text-red-600 !transition-colors"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
