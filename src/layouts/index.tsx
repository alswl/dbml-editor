import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">dbml-editor</Link>
        </li>
        <li>
          <a href="https://github.com/alswl/dbml-editor">Github</a>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
