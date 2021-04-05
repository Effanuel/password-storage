import {MODAL_OPEN, MODAL_CLOSE, ModalActions, ModalState} from './types';

const initialState = {
  showModal: null,
};

export const ModalReducer = (state: ModalState = initialState, action: ModalActions): ModalState => {
  switch (action.type) {
    case MODAL_OPEN:
      return {...state, showModal: action.payload};
    case MODAL_CLOSE:
      return {...state, showModal: null};
    default:
      return state;
  }
};

export const modalOpen = (payload: string): ModalActions => ({
  type: MODAL_OPEN,
  payload,
});

export const modalClose = (): ModalActions => ({
  type: MODAL_CLOSE,
});
