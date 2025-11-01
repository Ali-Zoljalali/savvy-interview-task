import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { ItemModalProps } from "./ItemModal";

const ItemModal: React.FC<ItemModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingItem,
  items,
}) => {
  const formik = useFormik({
    initialValues: {
      title: editingItem?.title || "",
      subtitle: editingItem?.subtitle || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .test(
          "unique",
          "This title already exists",
          (value) =>
            !items.some(
              (i) => i.title === value && i.title !== editingItem?.title
            )
        ),
      subtitle: Yup.string().required("Subtitle is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
          <Button onClick={onClose}>Cancel</Button>
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
  );
};

export default ItemModal;
