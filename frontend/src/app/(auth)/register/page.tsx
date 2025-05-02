'use client';

export default function Register() {

  const onSubmit = (formData: FormData) => {
    const username = formData.get("username");  
    const password = formData.get("password");
    console.log("Email or Username:", username);
    console.log("Password:", password);

    console.log("Register!");
  };

  return (
    <form
      className="flex flex-col gap-4 items-center justify-center bg-slate-100 p-4 rounded-md shadow-md text-black"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        onSubmit(formData);
      }}
    >
      <label htmlFor="username">Email or Username:</label>
      <input className="border" type="text" id="username" name="username" required />
      <br />
      <label htmlFor="password">Password:</label>
      <input className="border" type="password" id="password" name="password" required />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}