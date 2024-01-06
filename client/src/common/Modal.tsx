import { PropsWithChildren, useEffect } from "react";

export type ModalProps = PropsWithChildren<{
  onEscape: () => void;
  className?: string
}>;

export default function Modal(props: ModalProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key == "Escape")
        props.onEscape();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="fixed top-0 left-0 right-0 w-full overflow-x-hidden overflow-y-auto z-30" tabIndex={-1}>  
      <div className="flex items-center justify-center min-h-screen">
        {/* Background */}
        <div className="fixed z-40 inset-0 transition-opacity bg-black opacity-75"
          onClick={() => props.onEscape()}
          tabIndex={-1}
          aria-hidden />

        {/* Foreground */}
        <div className="z-50 rounded-lg" style={{ backgroundColor: "#36393f" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}