"use client";

import { useAuth } from "../context/AuthContext";
import DeleteRecipeButton from "./DeleteRecipeButton";
import EditRecipeButton from "./EditRecipeButton";

interface RecipeActionsProps {
  recipeId: number;
}

export default function RecipeActions({ recipeId }: RecipeActionsProps) {
  const { user, isLoading } = useAuth();

  // Nicht eingeloggt oder noch am Laden → nichts anzeigen
  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="flex gap-2 md:justify-end md:items-center">
      <EditRecipeButton recipeId={recipeId} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  );
}