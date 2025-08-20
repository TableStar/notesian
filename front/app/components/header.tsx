type HeaderProps = {
  title: string
  action?: React.ReactNode
}

export function Header({ title, action }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {action && <div className="flex items-center space-x-4">{action}</div>}
    </div>
  )
}