import {PropsWithChildren, useRef} from "react";
import {createPortal} from "react-dom";
import {useEventListener, useOnClickOutside, useScrollLock} from "usehooks-ts";
import {CSSTransition} from "react-transition-group";

export interface ModalProps extends PropsWithChildren {
  active?: boolean;
  onClose?: () => void;
}

export default function Modal({children, onClose, active = false}: ModalProps) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const {lock, unlock} = useScrollLock({autoLock: false});

  function handleClose() {
    onClose?.();
  }

  useOnClickOutside(modalRef, handleClose);

  useEventListener("keydown", (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      ev.preventDefault();
      handleClose();
    }
  });

  return (
    <CSSTransition
      in={active}
      timeout={0.35 * 1000}
      classNames="container"
      unmountOnExit
      onEnter={lock}
      onExit={unlock}
    >
      <>
        {createPortal(
          <div ref={overlayRef} className="container">
            <div className="backdrop" />
            <div className="modal" ref={modalRef}>
              {children}
            </div>

            <style jsx>{`
              .container {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
              }

              .backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                opacity: 0.25;
              }

              .modal {
                z-index: 3;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                background: white;
                width: 100%;
                max-height: min(800px, 80vh);
                overflow: hidden;
              }

              .container-enter > .backdrop {
                opacity: 0;
              }

              .container-enter > .modal {
                opacity: 0;
                transform: matrix(1, 0, 0, 1, 0, 533.594);
              }

              .container-enter-active > .backdrop {
                opacity: 0.25;
                transition: opacity 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
              }

              .container-enter-active > .modal {
                opacity: 1;
                transition:
                  opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                transform: translateZ(0);
              }

              .container-exit > .backdrop {
                opacity: 0.25;
              }

              .container-exit > .modal {
                opacity: 1;
              }

              .container-exit-active > .backdrop {
                opacity: 0;
                transition: opacity 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
              }

              .container-exit-active > .modal {
                opacity: 0;
                transition:
                  opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                transform: matrix(1, 0, 0, 1, 0, 533.594);
              }

              @media (min-width: 748px) {
                .container {
                  justify-content: center;
                }

                .modal {
                  border-radius: 6px;
                  width: 540px;
                }

                .container-enter > .modal {
                  transform: translateY(0, -40px, 0);
                }

                .container-enter-active > .modal {
                  transform: translateY(0);
                }

                .container-exit-active > .modal {
                  transform: translateY(0, -40px, 0);
                }
              }
            `}</style>
          </div>,
          document.getElementById("modal")!,
        )}
      </>
    </CSSTransition>
  );
}
