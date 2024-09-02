import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col mt-5">
    
      <Link className="mb-5" href="/login">Login</Link>
      <Link className="mb-5" href="/signup">Signup</Link>
      <Link className="" href="/home">Home Page</Link>

    </main>
  );
}
