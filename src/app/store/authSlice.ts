import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const TOKEN_STORAGE_KEY = 'otus-shop-token';

export type UserRole = 'admin' | 'user';

export interface Profile {
  email: string;
  name: string;
  about: string;
  role: UserRole;
}

interface AuthState {
  token: string | null;
  initialized: boolean;
  profile: Profile | null;
  pending: boolean;
}

const initialState: AuthState = {
  token: null,
  initialized: false,
  profile: null,
  pending: false,
};

const createToken = (email: string): string =>
  `fake:${encodeURIComponent(email.toLowerCase())}:${Date.now().toString(36)}`;

const getEmailFromToken = (token: string): string | null => {
  const [prefix, encodedEmail] = token.split(':');
  if (prefix !== 'fake' || !encodedEmail) {
    return null;
  }

  try {
    return decodeURIComponent(encodedEmail);
  } catch {
    return null;
  }
};

const createProfile = (token: string | null): Profile | null => {
  if (!token) {
    return null;
  }

  const email = getEmailFromToken(token);
  if (!email) {
    return null;
  }

  const isAdmin = email === 'admin@example.com';
  return {
    email,
    name: isAdmin ? 'Store administrator' : email.split('@')[0],
    about: isAdmin ? 'Manages the product catalog.' : 'Shop customer.',
    role: isAdmin ? 'admin' : 'user',
  };
};

export const fakeLogin = createAsyncThunk('auth/fakeLogin', async (email: string) => {
  await Promise.resolve();
  return createToken(email);
});

const setTokenAndProfile = (state: AuthState, token: string | null) => {
  const profile = createProfile(token);
  state.token = profile ? token : null;
  state.profile = profile;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeApplication(state, action: PayloadAction<string | null>) {
      setTokenAndProfile(state, action.payload);
      state.initialized = true;
    },
    tokenSynchronized(state, action: PayloadAction<string | null>) {
      setTokenAndProfile(state, action.payload);
      state.initialized = true;
    },
    logout(state) {
      setTokenAndProfile(state, null);
    },
    profileUpdated(state, action: PayloadAction<Pick<Profile, 'name' | 'about'>>) {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fakeLogin.pending, (state) => {
        state.pending = true;
      })
      .addCase(fakeLogin.fulfilled, (state, action) => {
        setTokenAndProfile(state, action.payload);
        state.pending = false;
      })
      .addCase(fakeLogin.rejected, (state) => {
        state.pending = false;
      });
  },
});

export const { initializeApplication, logout, profileUpdated, tokenSynchronized } = authSlice.actions;
export const authReducer = authSlice.reducer;

