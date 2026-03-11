import { cn } from "@/lib/cn";

type CodeSandboxProps = {
  src: string;
  title?: string;
  height?: number;
  className?: string;
  allow?: string;
  sandbox?: string;
};

const DEFAULT_ALLOW =
  "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking";

const DEFAULT_SANDBOX =
  "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts";

export function CodeSandbox({
  src,
  title = "CodeSandbox Embed",
  height = 500,
  className,
  allow = DEFAULT_ALLOW,
  sandbox = DEFAULT_SANDBOX,
}: CodeSandboxProps) {
  return (
    <div className={cn("my-6 overflow-hidden rounded-md border", className)}>
      <iframe
        src={src}
        title={title}
        allow={allow}
        sandbox={sandbox}
        loading="lazy"
        className="w-full border-0"
        style={{ height }}
      />
    </div>
  );
}
