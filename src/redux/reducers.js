const initialState = {
    selectedTags: [],
    selectedPlatform: 'all',
    error: '',
    cards: [],
    selectedSort: 'popularity',
    isLoading: true
};
  
const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_TAGS':
            return { ...state, selectedTags: action.payload };
        case 'SET_PLATFORM':
            return { ...state, selectedPlatform: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_CARDS':
            return { ...state, cards: action.payload };
        case 'SET_SORT':
            return { ...state, selectedSort: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export default mainPageReducer;