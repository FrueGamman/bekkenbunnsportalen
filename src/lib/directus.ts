const DIRECTUS_URL = import.meta.env.DEV ? "" : (import.meta.env.VITE_DIRECTUS_URL || "");
const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN || "CrroW4IZgGtsGuJWNayMuay0hnRGO6JO";

export async function directusFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${DIRECTUS_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Directus API error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const result = await response.json();
  return result.data as T;
}

export const getImageUrl = (id: string) => {
  if (!id) return "";
  const tokenParams = DIRECTUS_TOKEN ? `?access_token=${DIRECTUS_TOKEN}` : "";
  return `${DIRECTUS_URL}/assets/${id}${tokenParams}`;
};
