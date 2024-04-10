import styles from './layout.module.css'

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className={styles.innerLayout}>
      <div className={styles.children}>
        {children}
      </div>
    </div>)
}