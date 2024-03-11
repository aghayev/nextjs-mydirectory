import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/nutrition">Nutrition</Link>
        </li>
        <li>
          <Link href="/swimming">Swimming</Link>
        </li>
        <li>
          <Link href="/handyman">Handyman</Link>
        </li>
      </ul>
    </main>
  )
}
