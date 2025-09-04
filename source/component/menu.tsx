import { PropsWithChildren } from "react";
import { NavLink, NavLinkProps } from "react-router";

export interface ListProps extends PropsWithChildren {}

export interface ItemProps extends PropsWithChildren {
  to: NavLinkProps["to"];
}

function List({ children }: ListProps) {
  return <ul className="menu">{children}</ul>;
}

function Item({ children, to }: ItemProps) {
  return (
    <li className="menu-item">
      <NavLink to={to} className="menu-link">
        {children}
      </NavLink>
    </li>
  );
}

export default {
  List,
  Item,
};
