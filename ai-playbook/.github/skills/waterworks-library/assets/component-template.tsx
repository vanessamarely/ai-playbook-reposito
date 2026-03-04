import React from 'react'

interface ComponentNameProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  ariaLabel?: string
}

export function ComponentName({
  children,
  onClick,
  disabled = false,
  ariaLabel
}: ComponentNameProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault()
      if (onClick) {
        onClick(event as unknown as React.MouseEvent<HTMLButtonElement>)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      className="component-name"
    >
      {children}
    </button>
  )
}

export default ComponentName
