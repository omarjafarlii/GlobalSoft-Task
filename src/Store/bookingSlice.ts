import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type BoardType = 'FB' | 'HB' | 'NB'

interface SelectedHotel {
    id: number | null;
    name: string;
    price: number;
}

interface DailyMealSelection {
    lunchId: number | null;
    dinnerId: number | null;
}

interface BookingConfigState {
    selectedCountry: string;
    selectedDestination: string;
    selectedBoardType: BoardType; 
    tripDays: number;
    startDate: string;
    selectedHotel: SelectedHotel;
    dailyMealSelections: DailyMealSelection[]
}

const getInitialDailyMeals = (days: number): DailyMealSelection[] => {
    if (days <= 0) return []; 
    return Array.from({ length: days }, () => ({
        lunchId: null,
        dinnerId: null,
    }));
};


const initialState: BookingConfigState = {
    selectedCountry: 'CitizenShip',
    selectedDestination: 'Destination',
    selectedBoardType: 'FB',
    tripDays: 1,
    startDate: new Date().toISOString().split('T')[0],
    selectedHotel: { id: null, name: "Select Hotel", price: 0 },
    dailyMealSelections: getInitialDailyMeals(1), 
}    


const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        updateConfig: (state, action: PayloadAction<Partial<BookingConfigState>>) => {
            
            let dailyMealSelections = state.dailyMealSelections;

            if (action.payload.tripDays !== undefined && action.payload.tripDays !== state.tripDays) {
                dailyMealSelections = getInitialDailyMeals(action.payload.tripDays);
            } else if (action.payload.selectedBoardType !== undefined && action.payload.selectedBoardType !== state.selectedBoardType) {
                dailyMealSelections = getInitialDailyMeals(state.tripDays);
            }

            return { 
                ...state, 
                ...action.payload,
                dailyMealSelections: dailyMealSelections
            }
        },
        updateDailyMealSelection: (state, action: PayloadAction<{ dayIndex: number, mealType: 'lunch' | 'dinner', mealId: number | null }>) => {
            const { dayIndex, mealType, mealId } = action.payload;
            
            if (dayIndex >= 0 && dayIndex < state.dailyMealSelections.length) {
                const daySelection = state.dailyMealSelections[dayIndex];

                if (mealType === 'lunch') {
                    daySelection.lunchId = mealId;
                } else {
                    daySelection.dinnerId = mealId;
                }
                
                if (state.selectedBoardType === 'HB' && mealId !== null) {
                    if (mealType === 'lunch') {
                        daySelection.dinnerId = null;
                    } else if (mealType === 'dinner') {
                        daySelection.lunchId = null;
                    }
                }
            }
        },
        selectHotel: (state, action: PayloadAction<SelectedHotel>) => {
            state.selectedHotel = action.payload;
        }
    }
})


export const { updateConfig, updateDailyMealSelection, selectHotel } = bookingSlice.actions
const book = bookingSlice.reducer

export default book