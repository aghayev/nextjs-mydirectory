import styles from './layout.module.css'

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className={styles.innerLayout}>
      <div>
        <h2>NutritionPage</h2>
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </div>)
}