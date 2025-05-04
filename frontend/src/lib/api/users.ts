export async function createUserInBackend(token: string, data: {nombre: string }) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;


  console.log('URL:', url);
  console.log('Token:', token);
  console.log('Data:', data);

  const res = await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al crear usuario en backend');
  }

  return await res.json();
}
