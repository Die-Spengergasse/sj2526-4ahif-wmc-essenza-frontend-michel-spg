'use server';

import { revalidatePath } from 'next/cache';
import { recipeSchema, formatZodErrors } from '../lib/validation';

export async function createRecipe(formData: FormData) {
  // Validierung der Formulardaten mit Zod
  // FormData extrahieren
  const rawIngredients: { name: string; quantity: string }[] = [];
  let i = 0;
  while (formData.has(`ingredients[${i}][name]`)) {
    rawIngredients.push({
      name: formData.get(`ingredients[${i}][name]`) as string,
      quantity: formData.get(`ingredients[${i}][quantity]`) as string,
    });
    i++;
  }

  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    duration: Number(formData.get('duration')),
    instructions: formData.get('instructions') as string,
    ingredients: rawIngredients,
  };

  // Server-seitige Validation mit Zod
  const result = recipeSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: formatZodErrors(result.error),
    };
  }

  // Nur bei erfolgreicher Validation an API senden
  try {
    const response = await fetch('http://localhost:4000/api/recipes', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Fehler beim Speichern');
    }
    const data = await response.json();
    
    // Cache invalidieren nach erfolgreichem Speichern
    revalidatePath('/recipes');
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Fehler beim Speichern',
    };
  }
}