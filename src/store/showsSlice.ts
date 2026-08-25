import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

interface Country {
    name: string;
    code: string;
    timezone: string;
}

interface Network {
    id: number;
    name: string;
    country: Country | null;
    officialSite: string | null;
}

type WebChannel = Network; // same shape in the real API — no need to redefine it

interface Schedule {
    time: string;
    days: string[];
}

interface Rating {
    average: number | null;
}

interface ShowImage {
    medium: string;
    original: string;
}

interface Externals {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
}

interface LinkRef {
    href: string;
    name?: string;
}

interface ShowLinks {
    self: LinkRef;
    previousepisode?: LinkRef;
    nextepisode?: LinkRef;
}

export interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string | null;
    genres: string[];
    status: string;
    runtime: number | null;
    averageRuntime: number | null;
    premiered: string | null;
    ended: string | null;
    officialSite: string | null;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: Network | null;       // null for web-only shows — webChannel is populated instead
    webChannel: WebChannel | null;
    dvdCountry: Country | null;
    externals: Externals;
    image: ShowImage | null;       // null for some shows entirely
    summary: string | null;
    updated: number;
    _links: ShowLinks;
}

// TVMaze's search endpoint doesn't return Show[] directly — each result is
// wrapped with a relevance score, so the thunk below has to unwrap .show.
interface ShowSearchResult {
    score: number;
    show: Show;
}

const baseUrl: string = "https://api.tvmaze.com/shows";
const searchUrl: string = "https://api.tvmaze.com/search/shows"

// createAsyncThunk<ReturnType, ArgType, ThunkApiConfig> — ReturnType is what
// .fulfilled's action.payload will be typed as; ArgType is what you pass when
// dispatching (fetchShows() takes none, hence void).
export const fetchShows = createAsyncThunk<Show[], void, { rejectValue: string }>(
    "shows/fetchShows",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Show[]>(baseUrl);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Prefer the HTTP status if axios gives us one, otherwise a generic message
                return rejectWithValue(String(error.response?.status ?? "Network Error"));
            }
            return rejectWithValue("Network Error");
        }
    }
)
export const searchShowsByName = createAsyncThunk<ShowSearchResult[], string, { rejectValue: string }>(
    "shows/searchShowsByName",
    async (name, { rejectWithValue }) => {
        try {
            const response = await axios.get<ShowSearchResult[]>(searchUrl, { params: { q: name } });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(String(error.response?.status ?? "Network Error"));
            }
            return rejectWithValue("Network Error");
        }
    }
)

export const fetchShowById = createAsyncThunk<Show, string, { rejectValue: string }>(
    "shows/fetchShowById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get<Show>(`${baseUrl}/${id}`);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(String(error.response?.status ?? "Network Error"));
            }
            return rejectWithValue("Network Error");
        }
    }
)

interface InitialState {
    showsList: Show[],
    showsFetchStatus: ShowsFetchStatus,
    show: Show | null,
    showFetchStatus: ShowFetchStatus,
    favorites: Show[]
}

interface ShowsFetchStatus {
    status: string,
    errorMessage: string
}

interface ShowFetchStatus {
    status: string,
    errorMessage: string
}



const initialState: InitialState = {
    showsList: [],
    showsFetchStatus: { status: '', errorMessage: '' },
    show: null,
    showFetchStatus: { status: '', errorMessage: '' },
    favorites: []
};

const showSlice = createSlice({
    name: 'shows',
    initialState,
    // Plain synchronous reducers — favorites don't need a thunk since there's
    // no network request, just Redux state kept in sync with localStorage.
    reducers: {
        addFavorite: (state, action: PayloadAction<Show>) => {
            state.favorites.push(action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFavorite: (state, action: PayloadAction<Show>) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        // Rehydrates favorites from localStorage into Redux state — dispatched
        // on mount by pages that need it, since state resets to [] on every
        // page refresh but localStorage doesn't.
        loadFavorites: (state) => {
            const saved = localStorage.getItem('favorites');
            state.favorites = saved ? JSON.parse(saved) : [];
        }
    },
    // extraReducers handles actions from createAsyncThunk above (pending/
    // fulfilled/rejected), as opposed to the synchronous ones in `reducers`.
    extraReducers: (builder) => {
        builder.addCase(fetchShows.fulfilled, (state, action) => {
            // TVMaze's /shows has no paging, so it returns the whole catalog —
            // slice to keep the grid a reasonable size.
            state.showsList = action.payload.slice(0, 12);
            state.showsFetchStatus.status = 'succeeded';
        })
        builder.addCase(fetchShows.pending, (state) => {
            state.showsFetchStatus.status = 'loading';
            state.showsList = [];

        })
        builder.addCase(fetchShows.rejected, (state, action) => {
            state.showsFetchStatus.status = 'failed';
            state.showsFetchStatus.errorMessage = action.payload ?? "Something went wrong";
        })
        builder.addCase(searchShowsByName.fulfilled, (state, action) => {
            // Unwrap the {score, show} wrapper (see ShowSearchResult above) before storing
            state.showsList = action.payload.map(r => r.show).slice(0, 12);
            state.showsFetchStatus.status = 'succeeded';
        })
        builder.addCase(searchShowsByName.pending, (state) => {
            state.showsFetchStatus.status = 'loading';
            state.showsList = [];
        })
        builder.addCase(searchShowsByName.rejected, (state, action) => {
            state.showsFetchStatus.status = 'failed';
            state.showsFetchStatus.errorMessage = action.payload ?? "Something went wrong";
        })
        builder.addCase(fetchShowById.fulfilled, (state, action) => {
            state.show = action.payload;
            state.showFetchStatus.status = 'succeeded';
        })
        builder.addCase(fetchShowById.pending, (state) => {
            state.showFetchStatus.status = 'loading';
            // Clear the previous show so a slow-loading new page doesn't
            // briefly flash the last show's data before this one arrives.
            state.show = null;
        })
        builder.addCase(fetchShowById.rejected, (state, action) => {
            state.showFetchStatus.status = 'failed';
            state.showFetchStatus.errorMessage = action.payload ?? "Something went wrong";
        })
    }
})
export const {addFavorite, removeFavorite, loadFavorites} = showSlice.actions;
export default showSlice.reducer;


