export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";

interface ModalOpen {
  type: typeof MODAL_OPEN;
  payload: string;
}
interface ModalClose {
  type: typeof MODAL_CLOSE;
}

export type ModalActions = ModalOpen | ModalClose;
export interface ModalState {
  showModal: string | null | undefined;
}
