export async function createUserInBackend(token: string, data: { uid: string; email: string; nombre: string }) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${url}/usuario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al crear usuario en backend');
  }

  return await res.json();
}
