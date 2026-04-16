import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

/* eslint-disable react-refresh/only-export-components */
const AppContext = createContext(null);

const initialEvents = [
  {
    id: 'local-1',
    title: 'Tech Bootcamp Orientation',
    body: 'Welcome session for student developers, mentors, and project teams.',
    category: 'Technology',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-2',
    title: 'Arts Night Exhibit',
    body: 'An evening gallery walk featuring student-made posters, photos, and digital art.',
    category: 'Arts',
    status: 'closed',
    source: 'campus',
  },
  {
    id: 'local-3',
    title: 'Leadership Forum',
    body: 'Panel discussion about student leadership, event planning, and campus service.',
    category: 'Leadership',
    status: 'open',
    source: 'campus',
  },
];

const initialState = {
  events: initialEvents,
};

function eventReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [
          {
            id: crypto.randomUUID(),
            status: 'open',
            source: 'campus',
            ...action.payload,
          },
          ...state.events,
        ],
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case 'TOGGLE_EVENT_STATUS':
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload
            ? {
                ...event,
                status: event.status === 'open' ? 'closed' : 'open',
              }
            : event,
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('campus-auth') === 'true',
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem('campus-theme') || 'light',
  );

  useEffect(() => {
    localStorage.setItem('campus-auth', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('campus-theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      events: state.events,
      dispatch,
      isLoggedIn,
      login: () => setIsLoggedIn(true),
      logout: () => setIsLoggedIn(false),
      theme,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        ),
    }),
    [isLoggedIn, state.events, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }

  return context;
}
