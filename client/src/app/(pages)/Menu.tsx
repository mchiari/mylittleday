"use client"
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const Menu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/feed" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle({className: "text-neutral-900"})}>
              Feed
            </NavigationMenuLink>
          </Link>
          </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/student" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle({className: "text-neutral-900"})}>
              Student
            </NavigationMenuLink>
          </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <Link href="/user" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle({className: "text-neutral-900"})}>
              User
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Menu;
