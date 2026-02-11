// src/components/ui/Button.tsx
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import styles from "./Button.module.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const buttonClasses = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ")

    return <Comp className={buttonClasses} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button }
