import Link from "next/link";
import styles from './layout.module.css'

export default function Home() {
  return (
    <main className={styles.body}>
      <ul>
        <li>
          <Link href="/nutrition">Nutrition (Protected session-based route)</Link>
        </li>
        <li>
          <Link href="/api/db/sqlite">Api Db (Protected session-based route)</Link>
        </li>
        <hr/>
        <li>
          <Link href="/swimming">Swimming (Restricted route)</Link>
        </li>
        <li>
          <Link href="/handyman">Handyman (Protected api-rate limit route)</Link>
        </li>
        <li>
          <Link href="/api/ping">Ping (Protected geolocation-based route)</Link>
        </li>
      </ul>
    </main>
  )
}
