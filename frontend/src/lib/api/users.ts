
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createUserInBackend(token: string, data: { nombre: string }) {
  const res = await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json().catch(() => null);

  if (!res.ok) {
    const message = responseData?.message || 'Error desconocido';
    console.error("Error desde backend:", message);
    throw new Error(message);
  }

  return responseData;
}

export async function getUserInBackend(token: string) {

  const res = await fetch(`${url}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener usuario en backend');
  }

  return await res.json();
}
