import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './CustomLink.module.scss';

interface CustomLinkProps {
  children: string;
  to: string;
  src: string;
}

const setClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.sider_link_active : styles.sider_link;

const CustomLink = ({ children, to, src }: CustomLinkProps) => (
  <NavLink to={to} className={setClassName}>
    <img className={styles.sider_img} src={src} alt={to} />

    {children}
  </NavLink>
);

export default CustomLink;
