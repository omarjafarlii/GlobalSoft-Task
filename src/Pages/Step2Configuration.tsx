import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import type { RootState } from "../Store";
import { updateDailyMealSelection, selectHotel } from "../Store/bookingSlice";
import { Link } from "react-router";
import { hotels, type Hotel } from "../Data/Hotel";
import { meals, type MealItem } from "../Data/Meals";

const Step2Configuration = () => {
  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => state.book);

  const destinationKey = Object.keys(hotels).find(
    (key) => key.toLowerCase() === config.selectedDestination.toLowerCase()
  );
  const availableHotels: Hotel[] = destinationKey ? hotels[destinationKey] : [];
  const availableMeals = destinationKey ? meals[destinationKey] : null;

  const handleHotelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value ? parseInt(event.target.value) : null;
    const hotel = availableHotels.find((h) => h.id === selectedId);

    if (hotel) {
      dispatch(
        selectHotel({ id: hotel.id, name: hotel.name, price: hotel.price })
      );
    } else {
      dispatch(selectHotel({ id: null, name: "Select Hotel", price: 0 }));
    }
  };

  const handleMealSelect = (
    dayIndex: number,
    mealType: "lunch" | "dinner",
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const mealId = event.target.value ? parseInt(event.target.value) : null;

    dispatch(
      updateDailyMealSelection({
        dayIndex: dayIndex,
        mealType: mealType,
        mealId: mealId,
      })
    );
  };

  const getMealMenu = (mealType: "lunch" | "dinner"): MealItem[] => {
    if (!availableMeals) return [];
    return availableMeals[mealType] || [];
  };

  const isHotelSelected = config.selectedHotel?.id !== null;
  const tripDaysArray = Array.from({ length: config.tripDays }, (_, i) => i);
  const isNB = config.selectedBoardType === "NB";
  const isHB = config.selectedBoardType === "HB";

  const isMealDisabled = (dayIndex: number, mealType: "lunch" | "dinner") => {
    if (!isHotelSelected || isNB) return true;

    if (isHB) {
      const currentDaySelection = config.dailyMealSelections[dayIndex];
      if (mealType === "lunch") {
        return currentDaySelection?.dinnerId !== null;
      } else if (mealType === "dinner") {
        return currentDaySelection?.lunchId !== null;
      }
    }
    return false;
  };

  const getSelectValue = (dayIndex: number, mealType: "lunch" | "dinner") => {
    const selection = config.dailyMealSelections[dayIndex];
    if (!selection) return "";

    return mealType === "lunch"
      ? selection.lunchId || ""
      : selection.dinnerId || "";
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-[#002f72] mb-10 border-b-4 border-[#ffb700] pb-3">
        Hotel and Daily Meal Selection
      </h1>

      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-3 text-[#006ce4]">
          Trip Configuration
        </h2>
        <div className="flex flex-wrap gap-4 text-gray-700">
          <p>
            <strong>Destination:</strong>{" "}
            <span className="font-semibold">{config.selectedDestination}</span>
          </p>
          <p>
            <strong>Trip Days:</strong>{" "}
            <span className="font-semibold">{config.tripDays} days</span>
          </p>
          <p>
            <strong>Board Type:</strong>{" "}
            <span className="font-semibold text-[#ffb700]">
              {config.selectedBoardType}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold mb-6 text-[#002f72] border-b pb-2">
            1. Select Your Hotel 🏨
          </h2>

          {availableHotels.length === 0 ? (
            <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
              <p>No hotels available for this destination.</p>
            </div>
          ) : (
            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
              <label
                htmlFor="hotel-select"
                className="block text-gray-700 font-semibold mb-2"
              >
                Hotel Name and Price:
              </label>
              <select
                id="hotel-select"
                onChange={handleHotelSelect}
                value={config.selectedHotel?.id || ""}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#006ce4] focus:border-[#006ce4] appearance-none cursor-pointer text-lg bg-white"
              >
                <option value="" disabled>
                  --- Select Hotel ---
                </option>

                {availableHotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name} - {hotel.price} AZN / Night
                  </option>
                ))}
              </select>

              {isHotelSelected && (
                <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg shadow-sm">
                  Your Selection: <strong>{config.selectedHotel.name}</strong> (
                  {config.selectedBoardType})
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold mb-6 text-[#002f72] border-b pb-2">
            2. Daily Meal Plan 🍽️
          </h2>

          {!isHotelSelected ? (
            <div className="p-6 bg-orange-100 border-l-4 border-orange-500 text-orange-700 rounded-lg">
              <p>
                Please select a hotel first to start meal configuration.
              </p>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              {isNB ? (
                <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg mb-4">
                  <p className="font-semibold">No Board (NB) Selected:</p>
                  <p className="text-sm">
                    Meal selection is prohibited. Dropdowns are disabled.
                  </p>
                </div>
              ) : isHB ? (
                <div className="p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-800 rounded-lg mb-4">
                  <p className="font-semibold">Half Board (HB) Selected:</p>
                  <p className="text-sm">
                    Breakfast included. You can only select Lunch OR Dinner (mutually exclusive).
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg mb-4">
                  <p className="font-semibold">Full Board (FB) Selected:</p>
                  <p className="text-sm">
                    Lunch and Dinner can be selected freely.
                  </p>
                </div>
              )}

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {tripDaysArray.map((dayIndex) => (
                  <div
                    key={dayIndex}
                    className="p-3 border border-gray-300 rounded-lg bg-gray-50"
                  >
                    <h4 className="text-md font-bold mb-2 text-[#002f72]">
                      Day {dayIndex + 1}
                    </h4>

                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Lunch Selection:
                        </label>
                        <select
                          onChange={(e) =>
                            handleMealSelect(dayIndex, "lunch", e)
                          }
                          value={getSelectValue(dayIndex, "lunch")}
                          disabled={isMealDisabled(dayIndex, "lunch")}
                          className={`w-full p-2 border rounded-lg text-sm ${
                            isMealDisabled(dayIndex, "lunch")
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-white"
                          }`}
                        >
                          <option value="">--- Select Lunch ---</option>
                          {getMealMenu("lunch").map((meal) => (
                            <option key={meal.id} value={meal.id}>
                              {meal.name} ({meal.price} AZN)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Dinner Selection:
                        </label>
                        <select
                          onChange={(e) =>
                            handleMealSelect(dayIndex, "dinner", e)
                          }
                          value={getSelectValue(dayIndex, "dinner")}
                          disabled={isMealDisabled(dayIndex, "dinner")}
                          className={`w-full p-2 border rounded-lg text-sm ${
                            isMealDisabled(dayIndex, "dinner")
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-white"
                          }`}
                        >
                          <option value="">--- Select Dinner ---</option>
                          {getMealMenu("dinner").map((meal) => (
                            <option key={meal.id} value={meal.id}>
                              {meal.name} ({meal.price} AZN)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3 pt-6 border-t border-gray-200">
        <Link
          to="/"
          className="flex items-center justify-center gap-1 text-sm md:text-base w-full md:w-auto whitespace-nowrap px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition duration-300 shadow-md"
        >
          <IoIosArrowBack size={20} />
          Back (Configuration)
        </Link>

        <Link
          to="/summary"
          className={`flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto px-6 py-3 text-white font-medium rounded-lg transition duration-300 shadow-md ${
            isHotelSelected
              ? "bg-[#006ce4] hover:bg-[#0057b8] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          Next (Summary & Pricing)
          <IoIosArrowForward size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Step2Configuration;