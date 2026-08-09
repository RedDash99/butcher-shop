import styles from './container.module.sass'

export default function Container({ children, ...props }) {
  return (
    <div className={styles.container} {...props}>
      {children}
    </div>
  )
}
