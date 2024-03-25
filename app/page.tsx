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
        <hr/>
        <li>
          <Link href="/api/sqlite">Api Sqlite</Link>
        </li>
        <li>
          <Link href="/api/ping">Ping</Link>
        </li>
        <li>
          <Link href="/reduxcounter">Redux Counter</Link>
        </li>
      </ul>
    </main>
  )
}
