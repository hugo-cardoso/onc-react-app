import { useEffect } from "react";
import type { ReactNode } from "react";
import { Wrapper, Container } from "./styles";

type BaseModalProps = {
  isOpen: boolean;
  onEscape?: () => void;
  children: ReactNode;
};

export const BaseModal = (props: BaseModalProps) => {

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onEscape?.();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <Wrapper isOpen={props.isOpen}>
      <Container>
        {props.children}
      </Container>
    </Wrapper>
  );
};