import { useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { Wrapper, Container, Content } from "./styles";
import useOnclickOutside from "react-cool-onclickoutside";

type BaseModalProps = {
  isOpen: boolean;
  onEscape?: () => void;
  onClose?: () => void;
  children: ReactNode;
};

export const BaseModal = (props: BaseModalProps) => {

  const modalRef = useOnclickOutside(() => {
    if (props.isOpen) props.onClose?.();
  });

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      props.onEscape?.();
    }
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keydown', handleEscape);
      return;
    }

    document.removeEventListener('keydown', handleEscape);
  }, [props.isOpen]);

  return (
    <Wrapper isOpen={props.isOpen}>
      <Container>
        <Content ref={modalRef}>
          {props.children}
        </Content>
      </Container>
    </Wrapper>
  );
};