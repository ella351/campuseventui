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
    title: 'CAS Week',
    body: 'All College of Arts and Science courses will participate in exhibits, contests, performances, and student activities.',
    category: 'CAS',
    date: '2026-05-06',
    time: '08:00 AM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-2',
    title: 'CAS Night',
    body: 'All CAS students will join a night of recognition, performances, and fellowship.',
    category: 'CAS',
    date: '2026-05-09',
    time: '06:00 PM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-3',
    title: 'CAS Research Conference',
    body: 'All CAS courses will present research studies, projects, and academic outputs.',
    category: 'CAS',
    date: '2026-05-14',
    time: '09:00 AM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-4',
    title: 'English Language Speech Festival',
    body: 'Bachelor of Arts in English Language students will present speeches, literary works, and communication projects.',
    category: 'BA English Language',
    date: '2026-05-16',
    time: '01:00 PM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-5',
    title: 'Psychology Mental Health Forum',
    body: 'Bachelor of Arts in Psychology students will lead talks and activities about mental health and student wellness.',
    category: 'BA Psychology',
    date: '2026-05-20',
    time: '10:00 AM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-6',
    title: 'Social Science Community Forum',
    body: 'Bachelor of Arts in Social Science students will discuss community issues, culture, society, and social research.',
    category: 'BA Social Science',
    date: '2026-05-22',
    time: '02:00 PM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-7',
    title: 'Public Administration Leadership Seminar',
    body: 'Bachelor of Public Administration students will organize a seminar about leadership, governance, and public service.',
    category: 'Public Administration',
    date: '2026-05-27',
    time: '09:30 AM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-8',
    title: 'Information Technology Capstone Expo',
    body: 'Bachelor of Science in Information Technology students will showcase capstone systems, Java projects, and web applications.',
    category: 'BSIT',
    date: '2026-05-29',
    time: '08:30 AM',
    status: 'open',
    source: 'campus',
  },
  {
    id: 'local-9',
    title: 'Mathematics Quiz Bee',
    body: 'Bachelor of Science in Mathematics students will compete in problem solving, logic, and applied mathematics questions.',
    category: 'Mathematics',
    date: '2026-06-03',
    time: '01:30 PM',
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [theme, setTheme] = useState(
    () => localStorage.getItem('campus-theme') || 'light',
  );

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
