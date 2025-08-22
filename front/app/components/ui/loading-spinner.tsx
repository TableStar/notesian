
export function Spinner({ size = "w-8 h-8" }: { size?: string }) {
  return (
    <div className={`border-gray-300 animate-spin rounded-full border-4 border-t-red-600 ${size}`} />
  );
}

  
export function LoadingText({ children = "Loading..." }: { children?: React.ReactNode }) {
  return (
    <div className="text-sm text-muted-foreground">{children}</div>
  );
}


export function GlobalSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <Spinner size="w-20 h-20" />
      <LoadingText>Loading....</LoadingText>
    </div>
  );
}


export function NavigationSpinner() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background border rounded-lg p-6 shadow-lg flex flex-col items-center gap-3">
        <Spinner />
        <LoadingText />
      </div>
    </div>
  );
}