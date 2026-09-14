import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getProfile, signIn, signUp, updateProfile, type ServerProfile } from '../../shared/api/rest';

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
  error: string | null;
}
const initialState: AuthState = { token: null, initialized: false, profile: null, pending: false, error: null };

const toProfile = (profile: ServerProfile): Profile => ({
  email: profile.email,
  name: profile.name || profile.email.split('@')[0],
  about: '',
  role: profile.email === 'admin@example.com' ? 'admin' : 'user',
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (credentials: { email: string; password: string; mode: 'signin' | 'signup' }) => {
    const result =
      credentials.mode === 'signin'
        ? await signIn(credentials.email, credentials.password)
        : await signUp(credentials.email, credentials.password);
    return { token: result.token, profile: toProfile(await getProfile(result.token)) };
  }
);

export const restoreSession = createAsyncThunk('auth/restoreSession', async (token: string, { rejectWithValue }) => {
  try {
    return { token, profile: toProfile(await getProfile(token)) };
  } catch {
    return rejectWithValue('Session expired. Please sign in again.');
  }
});

export const saveProfile = createAsyncThunk(
  'auth/saveProfile',
  async (values: Pick<Profile, 'name' | 'about'>, { getState, rejectWithValue }) => {
    const token = (getState() as { auth: AuthState }).auth.token;
    if (!token) return rejectWithValue('Please sign in to update your profile.');
    try {
      return { ...toProfile(await updateProfile(token, values.name)), about: values.about };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unable to update profile.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeApplication(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.initialized = !action.payload;
    },
    tokenSynchronized(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.profile = null;
      state.initialized = !action.payload;
    },
    logout(state) {
      state.token = null;
      state.profile = null;
      state.error = null;
      state.initialized = true;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authenticate.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.initialized = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Authentication failed.';
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.initialized = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.token = null;
        state.profile = null;
        state.initialized = true;
      })
      .addCase(saveProfile.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.pending = false;
        state.profile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.pending = false;
        state.error = String(action.payload ?? action.error.message ?? 'Unable to update profile.');
      }),
});
export const { initializeApplication, logout, tokenSynchronized } = authSlice.actions;
export const authReducer = authSlice.reducer;
