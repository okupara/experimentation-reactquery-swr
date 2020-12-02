export type Pokemon = {
  id: number
  imageUrl: string
}

export const fromJson = (jsonObj: Record<string, any>): Pokemon => {
  return {
    id: jsonObj.id,
    imageUrl: jsonObj.sprites.other["official-artwork"].front_default,
  }
}
