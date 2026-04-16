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
    title: 'BSIT Capstone Project Exhibit',
    body: 'Information Technology students present web systems, mobile apps, and research-based capstone solutions for the ISPSC Tagudin Campus community.',
    category: 'BSIT',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-2',
    title: 'CAS Research Conference',
    body: 'Students from English Language, Psychology, Social Science, Public Administration, IT, and Mathematics share research outputs and academic presentations.',
    category: 'CAS',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-3',
    title: 'Java Programming Challenge',
    body: 'BSIT students compete in a timed programming contest focused on Java fundamentals, problem solving, and clean code.',
    category: 'BSIT',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-4',
    title: 'CAS Quiz Bee',
    body: 'A friendly academic competition featuring general education, campus history, CAS programs, and current affairs.',
    category: 'CAS',
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
  const [currentUser, setCurrentUser] = useState(
    () =>
      localStorage.getItem('campus-user') ||
      (localStorage.getItem('campus-auth') === 'true' ? 'Ella Estrella' : ''),
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem('campus-theme') || 'light',
  );

  useEffect(() => {
    localStorage.setItem('campus-auth', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campus-user', currentUser);
    } else {
      localStorage.removeItem('campus-user');
    }
  }, [currentUser]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('campus-theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      events: state.events,
      dispatch,
      isLoggedIn,
      currentUser,
      login: (username, password) => {
        const isValidUser =
          username.trim().toLowerCase() === 'ella estrella' &&
          password === 'ella123456';

        if (isValidUser) {
          setCurrentUser('Ella Estrella');
          setIsLoggedIn(true);
        }

        return isValidUser;
      },
      logout: () => {
        setCurrentUser('');
        setIsLoggedIn(false);
      },
      theme,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        ),
    }),
    [currentUser, isLoggedIn, state.events, theme],
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
