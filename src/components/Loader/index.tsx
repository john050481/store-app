import { FC } from 'react';
import styles from './loader.module.scss';
import classnames from 'classnames';

type TLoader = {
  isLoading?: boolean;
  isSmall?: boolean;
  title?: string;
};

export const Loader: FC<TLoader> = ({ isLoading, isSmall, title }) => {
  return isLoading ? (
    <div className={styles.loader}>
      <div
        className={classnames(styles.loader__img, {
          [styles.loader__img_small]: isSmall,
        })}
      ></div>
      <div className={styles.loader__title}>{title}</div>
    </div>
  ) : null;
};
