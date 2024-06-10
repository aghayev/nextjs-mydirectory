import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/nutrition">Nutrition</Link>
        </li>
        <li>
          <Link href="/api/db/sqlite">Api Sqlite</Link>
        </li>
        <li>
          <Link href="/swimming">Swimming</Link>
        </li>
        <li>
          <Link href="/handyman">Handyman</Link>
        </li>
        <hr/>
        <li>
          <Link href="/api/ping">Ping</Link>
        </li>
        <li>
          <Link href="/form">Form login</Link>
        </li>
      </ul>
    </main>
  )
}
