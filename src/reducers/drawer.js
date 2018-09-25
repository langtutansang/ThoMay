import { DRAWER_OPEN, DRAWER_CLOSE } from '@constants/reducer'
const initialState = {
  isOpen: false
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case DRAWER_OPEN: {
      return {isopen: true}
    }
    case DRAWER_CLOSE: {
      return {isopen: false}
    }
    default: {
      return state;
    }
  }
};

export default auth;
