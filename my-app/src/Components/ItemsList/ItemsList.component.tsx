import { FC, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Item } from "../Item/Item";
import ItemCard from "../Item/ItemCard.component";

const ItemsList: FC = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  });
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleOpen = (item?: Item) => {
    if (item) {
      setEditingItem(item);
      formik.setValues({ title: item.title, subtitle: item.subtitle });
    } else {
      setEditingItem(null);
      formik.resetForm();
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = (item: Item) => {
    const updated = items.filter((i) => i.title !== item.title);
    setItems(updated);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .test(
          "unique",
          "This title already exists",
          (value) => !items.some((i) => i.title === value)
        ),
      subtitle: Yup.string().required("Subtitle is required"),
    }),
    onSubmit: (values) => {
      if (editingItem) {
        setItems((prev) =>
          prev.map((it) =>
            it.title === editingItem.title
              ? { ...it, title: values.title, subtitle: values.subtitle }
              : it
          )
        );
      } else {
        const newItem: Item = {
          title: values.title,
          subtitle: values.subtitle,
          createdDate: new Date().toLocaleString(),
        };
        setItems((prev) => [newItem, ...prev]);
      }
      handleClose();
    },
  });

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Items</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          sx={{ borderRadius: "9999px", paddingX: 3 }}
        >
          + Create
        </Button>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.title}
              item={item}
              onEdit={handleOpen}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No items yet.</p>
        )}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="font-semibold text-xl text-gray-800">
            {editingItem ? "Edit Item" : "Create New Item"}
          </DialogTitle>

          <DialogContent className="space-y-4 mt-2">
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              label="Subtitle"
              name="subtitle"
              fullWidth
              value={formik.values.subtitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
              helperText={formik.touched.subtitle && formik.errors.subtitle}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formik.isValid || !formik.dirty}
            >
              {editingItem ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ItemsList;
