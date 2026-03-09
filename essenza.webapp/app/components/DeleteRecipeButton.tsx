"use client";

import { deleteRecipe } from "../actions/recipes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

export default function DeleteRecipeButton({ recipeId }: { recipeId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    
    const result = await deleteRecipe(recipeId);

    if (result.success) {
      router.push("/recipes");
    } else {
      setError("Fehler beim Löschen des Rezepts. Bitte versuchen Sie es erneut.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg 
                   hover:bg-red-700 transition-colors duration-200"
      >
        <FaTrash />
        Rezept löschen
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              disabled={isDeleting}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <FaTimes size={20} />
            </button>

            {/* Icon */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <FaTrash className="text-red-600 dark:text-red-400" size={24} />
            </div>

            {/* Title */}
            <h3 className="mb-2 text-center text-xl font-semibold text-gray-900 dark:text-white">
              Rezept löschen?
            </h3>

            {/* Description */}
            <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
              Möchten Sie dieses Rezept wirklich löschen? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium 
                         text-gray-700 hover:bg-gray-50 disabled:opacity-50 
                         dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white 
                         hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Wird gelöscht...
                  </span>
                ) : (
                  "Jetzt löschen"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}