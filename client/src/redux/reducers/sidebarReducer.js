import { TOGGLE_SIDEBAR } from "../Actions/actionsSidebar";

const initialState = {
  isSidebarOpen: true, // Initial sidebar state
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen, // Toggle the state
      };
    default:
      return state;
  }
};

export default sidebarReducer;
