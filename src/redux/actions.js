export const setSelectedTags = (tags) => ({
    type: 'SET_SELECTED_TAGS',
    payload: tags,
});

export const setPlatform = (platform) => ({
    type: 'SET_PLATFORM',
    payload: platform,
});

export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
});

export const setShowAllTags = (show) => ({
    type: 'SET_SHOW_ALL_TAGS',
    payload: show,
});

export const setCards = (cards) => ({
    type: 'SET_CARDS',
    payload: cards,
});

export const setSort = (sort) => ({
    type: 'SET_SORT',
    payload: sort,
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading,
});