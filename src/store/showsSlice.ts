import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

interface Show {
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


export const fetchShows = createAsyncThunk<Show[], void, { rejectValue: string }>(
    "shows/fetchShows",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Show[]>("https://api.tvmaze.com/shows");
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
    showsFetchStatus: ShowsFetchStatus
}

interface ShowsFetchStatus {
    status: string,
    errorMessage: string
}

const initialState: InitialState = {
    showsList: [],
    showsFetchStatus: { status: '', errorMessage: '' }
};

const showSlice = createSlice({
    name: 'shows',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchShows.fulfilled, (state, action) => {
            state.showsList = action.payload.slice(0, 8);
            state.showsFetchStatus.status = 'succeeded';
        })
        builder.addCase(fetchShows.pending, (state, action) => {
            state.showsFetchStatus.status = 'loading';
            state.showsList = [];
        })
        builder.addCase(fetchShows.rejected, (state, action) => {
            state.showsFetchStatus.status = 'failed';
            state.showsFetchStatus.errorMessage = action.payload ?? "Something went wrong";
        })
    }
})


