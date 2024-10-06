import { useRouter } from 'next/navigation';
import { useCallback, useReducer, Dispatch } from 'react';

interface State {
  openContent: boolean;
  openTag: boolean;
  editTag: boolean;
  openForm: boolean;
}

type Action =
  | { type: 'TOGGLE_CONTENT' }
  | { type: 'TOGGLE_TAG' }
  | { type: 'TOGGLE_EDIT_TAG' }
  | { type: 'TOGGLE_FORM' }
  | { type: 'CLOSE_ALL' };

const initialState: State = {
  openContent: false,
  openTag: false,
  editTag: false,
  openForm: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_CONTENT':
      return { ...state, openContent: !state.openContent };
    case 'TOGGLE_TAG':
      return { ...state, openTag: !state.openTag };
    case 'TOGGLE_EDIT_TAG':
      return { ...state, editTag: !state.editTag };
    case 'TOGGLE_FORM':
      return { ...state, openForm: !state.openForm };
    case 'CLOSE_ALL':
      return initialState;
    default:
      return state;
  }
}

function useMyBookInfoState() {
  return useReducer(reducer, initialState);
}

function useMyBookInfoStateHandler(state: State, dispatch: Dispatch<Action>) {
  const openContentHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch({ type: 'TOGGLE_CONTENT' });
    },
    []
  );

  const openTagHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (state.editTag) {
        dispatch({ type: 'TOGGLE_EDIT_TAG' });
      }
      if (state.openForm) {
        dispatch({ type: 'TOGGLE_FORM' });
      }
      dispatch({ type: 'TOGGLE_TAG' });
    },
    [state.editTag, state.openForm]
  );

  const editTagHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch({ type: 'TOGGLE_EDIT_TAG' });
    },
    []
  );

  const openFormHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch({ type: 'TOGGLE_FORM' });
    },
    []
  );

  return {
    openContentHandler,
    openTagHandler,
    editTagHandler,
    openFormHandler,
  };
}

function useMyBookInfoRouter() {
  const router = useRouter();

  const navigateToTagSearch = useCallback(
    (tag: string, type: 'person' | 'publisher' | 'isbn') => {
      router.push(`/search?query=${tag}&target=${type}&sort=accuracy`);
    },
    [router]
  );

  return {
    navigateToTagSearch,
  };
}

export default function useMyBookInfo() {
  const [state, dispatch] = useMyBookInfoState();
  const handlers = useMyBookInfoStateHandler(state, dispatch);
  const router = useMyBookInfoRouter();

  return {
    ...state,
    ...router,
    handlers,
  };
}
