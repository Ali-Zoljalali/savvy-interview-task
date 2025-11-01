import { Item } from "../Item/Item";

export interface ItemModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: { title: string; subtitle: string }) => void;
    editingItem: Item | null;
    items: Item[];
}