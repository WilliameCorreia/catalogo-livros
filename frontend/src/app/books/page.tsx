"use client";

import { useState } from "react";
import { BookList } from "../../components/books/BookList";
import { BookForm } from "../../components/books/BookForm";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { useBooks } from "../../hooks/useBooks";
import { Book, CreateBookPayload } from "../../types/book";
import { useToast } from "../../contexts/ToastContext";

export default function BooksPage() {
  const { books, isLoading, error, addBook, editBook, removeBook } = useBooks();
  const toast = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddSubmit = async (payload: CreateBookPayload) => {
    try {
      await addBook(payload);
      setShowAddModal(false);
      toast.success("Livro cadastrado!", `"${payload.title}" foi adicionado à biblioteca.`);
    } catch {
      toast.error("Erro ao cadastrar", "Não foi possível salvar o livro. Tente novamente.");
    }
  };

  const handleEditSubmit = async (payload: CreateBookPayload) => {
    if (!editingBook) return;
    try {
      await editBook(editingBook.id, payload);
      setEditingBook(null);
      toast.success("Livro atualizado!", `"${payload.title}" foi salvo com sucesso.`);
    } catch {
      toast.error("Erro ao atualizar", "Não foi possível salvar as alterações. Tente novamente.");
    }
  };

  const handleDelete = async (id: string) => {
    const book = books.find((b) => b.id === id);
    try {
      await removeBook(id);
      toast.success("Livro excluído", book ? `"${book.title}" foi removido.` : undefined);
    } catch {
      toast.error("Erro ao excluir", "Não foi possível excluir o livro. Tente novamente.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-hi)" }}>
            Minha Biblioteca
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-md)" }}>
            {isLoading
              ? "Carregando..."
              : `${books.length} ${books.length === 1 ? "livro" : "livros"} cadastrado${books.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="mr-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar Livro
        </Button>
      </div>

      <BookList
        books={books}
        isLoading={isLoading}
        error={error}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />

      {showAddModal && (
        <Modal title="Cadastrar Novo Livro" onClose={() => setShowAddModal(false)}>
          <BookForm
            onSubmit={handleAddSubmit}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}

      {editingBook && (
        <Modal title="Editar Livro" onClose={() => setEditingBook(null)}>
          <BookForm
            initialValues={{
              title: editingBook.title,
              author: editingBook.author,
              category: editingBook.category,
            }}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingBook(null)}
            submitLabel="Salvar Alterações"
          />
        </Modal>
      )}
    </main>
  );
}
