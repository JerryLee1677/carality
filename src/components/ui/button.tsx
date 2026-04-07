import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Button<T extends ElementType = "button">({
  as,
  className,
  ...rest
}: ButtonProps<T>) {
  const Component = as ?? "button";
  const buttonProps =
    Component === "button"
      ? ({ type: "button", ...rest } as ComponentPropsWithoutRef<"button">)
      : rest;

  return (
    <Component
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900",
        className,
      )}
      {...buttonProps}
    />
  );
}
