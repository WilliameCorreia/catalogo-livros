"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { CreateBookPayload, BOOK_CATEGORIES } from "../../types/book";

interface BookFormProps {
  onSubmit: (payload: CreateBookPayload) => Promise<void>;
  onCancel?: () => void;
  initialValues?: CreateBookPayload;
  submitLabel?: string;
}

export function BookForm({
  onSubmit,
  onCancel,
  initialValues,
  submitLabel = "Cadastrar Livro",
}: BookFormProps) {
  const [values, setValues] = useState<CreateBookPayload>(
    initialValues ?? { title: "", author: "", category: "" }
  );
  const [errors, setErrors] = useState<Partial<CreateBookPayload>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<CreateBookPayload> = {};
    if (!values.title.trim()) errs.title = "Título é obrigatório";
    if (!values.author.trim()) errs.author = "Autor é obrigatório";
    if (!values.category) errs.category = "Categoria é obrigatória";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      setValues({ title: "", author: "", category: "" });
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="title"
        label="Título"
        placeholder="Ex: O Senhor dos Anéis"
        value={values.title}
        error={errors.title}
        onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
      />
      <Input
        id="author"
        label="Autor"
        placeholder="Ex: J.R.R. Tolkien"
        value={values.author}
        error={errors.author}
        onChange={(e) => setValues((v) => ({ ...v, author: e.target.value }))}
      />
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="category"
          className="text-sm font-medium"
          style={{ color: "var(--text-hi)" }}
        >
          Categoria
        </label>
        <select
          id="category"
          value={values.category}
          onChange={(e) => setValues((v) => ({ ...v, category: e.target.value }))}
          className="rounded-lg px-3 py-2 text-sm outline-none transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            color: values.category ? "var(--text-hi)" : "var(--text-lo)",
            border: `1px solid ${errors.category ? "var(--danger)" : "var(--border)"}`,
            boxShadow: "var(--shadow-sm)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = `0 0 0 3px var(--accent-surface)`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors.category
              ? "var(--danger)"
              : "var(--border)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          }}
        >
          <option value="">Selecione uma categoria</option>
          {BOOK_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-xs font-medium" style={{ color: "var(--danger)" }}>
            {errors.category}
          </span>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-1">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
