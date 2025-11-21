import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router";
import type { RootState } from "../Store";
import type { BoardType } from "../Store/bookingSlice";
import { meals, type MealItem, type MealsByCountry } from "../Data/Meals";

const findMealById = (
  mealId: number | null,
  mealsData: MealsByCountry,
  destination: string
): MealItem | null => {
  if (mealId === null) return null;

  const countryMeals = mealsData[destination];
  if (!countryMeals) return null;

  const allMeals = [
    ...(countryMeals.lunch || []),
    ...(countryMeals.dinner || []),
  ];
  return allMeals.find((meal) => meal.id === mealId) || null;
};

const Step3Configuration = () => {
  const config = useSelector((state: RootState) => state.book);

  const {
    selectedHotel,
    tripDays,
    selectedDestination,
    selectedBoardType,
    dailyMealSelections,
    selectedCountry,
    startDate,
  } = config;

  const destinationKey = Object.keys(meals).find(
    (key) => key.toLowerCase() === selectedDestination.toLowerCase()
  );
  const availableMeals = destinationKey ? meals[destinationKey] : null;

  const getBoardTypeName = (code: BoardType) => {
    switch (code) {
      case "FB":
        return "Full Board (FB)";
      case "HB":
        return "Half Board (HB)";
      case "NB":
        return "No Board (NB)";
      default:
        return "Unknown";
    }
  };

  const calculateDailyCost = (dayIndex: number): number => {
    let dayTotal = 0;

    const hotelPricePerNight = selectedHotel?.price || 0;
    dayTotal += hotelPricePerNight;

    const mealSelection = dailyMealSelections[dayIndex];

    if (mealSelection && selectedBoardType !== "NB" && availableMeals) {
      const lunch = findMealById(
        mealSelection.lunchId,
        meals,
        selectedDestination
      );
      if (lunch) {
        dayTotal += lunch.price;
      }

      const dinner = findMealById(
        mealSelection.dinnerId,
        meals,
        selectedDestination
      );
      if (dinner) {
        dayTotal += dinner.price;
      }
    }

    return dayTotal;
  };

  const dailyCosts = Array.from({ length: tripDays }, (_, i) =>
    calculateDailyCost(i)
  );
  const grandTotal = dailyCosts.reduce((sum, cost) => sum + cost, 0);

  if (!selectedHotel?.id) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-extrabold text-red-700 mb-6">Error!</h1>
        <p className="text-xl text-gray-600 mb-8">
          You must select a hotel in the **Meal Selection step** before proceeding to Summary.
        </p>
        <Link
          to="/meals"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#ffb700] text-[#002f72] rounded-lg font-medium hover:bg-[#e6a300] transition duration-300 shadow-md w-max mx-auto"
        >
          <IoIosArrowBack size={20} /> Back to Meal Selection
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-[#002f72] mb-10 border-b-4 border-[#ffb700] pb-3">
        Booking Summary & Total Cost
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#006ce4]">
            <h2 className="text-2xl font-bold mb-4 text-[#002f72]">
              1. Trip Configuration Overview
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Citizenship:</strong>{" "}
                <span className="font-semibold">{selectedCountry}</span>
              </p>
              <p>
                <strong>Destination:</strong>{" "}
                <span className="font-semibold">{selectedDestination}</span>
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                <span className="font-semibold">{startDate}</span>
              </p>
              <p>
                <strong>Trip Duration:</strong>{" "}
                <span className="font-semibold">{tripDays} days</span>
              </p>
              <p>
                <strong>Board Type:</strong>{" "}
                <span className="font-semibold text-[#ffb700]">
                  {getBoardTypeName(selectedBoardType)}
                </span>
              </p>
              <p>
                <strong>Selected Hotel:</strong>{" "}
                <span className="font-semibold text-green-600">
                  {selectedHotel.name}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#006ce4]">
            <h2 className="text-2xl font-bold mb-4 text-[#002f72]">
              2. Daily Selections Detail
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {dailyCosts.map((cost, dayIndex) => {
                const daySelection = dailyMealSelections[dayIndex];
                const lunch = findMealById(
                  daySelection?.lunchId || null,
                  meals,
                  selectedDestination
                );
                const dinner = findMealById(
                  daySelection?.dinnerId || null,
                  meals,
                  selectedDestination
                );
                const isNB = selectedBoardType === "NB";

                const hotelPrice = selectedHotel?.price || 0;

                return (
                  <div
                    key={dayIndex}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-lg font-bold text-[#006ce4]">
                        Day {dayIndex + 1}
                      </h4>
                      <ul className="list-disc list-inside ml-4 text-sm text-gray-600">
                        <li>
                          Hotel: **{selectedHotel.name}** ({hotelPrice} AZN /
                          Night)
                        </li>
                        <li>
                          Lunch:{" "}
                          {isNB
                            ? "Not Included (NB)"
                            : lunch
                            ? `${lunch.name} (${lunch.price} AZN)`
                            : "Not Selected"}
                        </li>
                        <li>
                          Dinner:{" "}
                          {isNB
                            ? "Not Included (NB)"
                            : dinner
                            ? `${dinner.name} (${dinner.price} AZN)`
                            : "Not Selected"}
                        </li>
                      </ul>
                    </div>
                    <div className="font-bold text-lg text-gray-800">
                      {cost} AZN
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white p-6 rounded-xl shadow-xl border-t-4 border-[#ffb700]">
            <h2 className="text-2xl font-extrabold mb-4 text-[#002f72]">
              Booking Total
            </h2>

            <div className="space-y-3 pb-4 border-b">
              {dailyCosts.map((cost, dayIndex) => (
                <div
                  key={dayIndex}
                  className="flex justify-between text-gray-700"
                >
                  <span>Day {dayIndex + 1} Cost:</span>
                  <span className="font-medium">{cost} AZN</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <h3 className="text-xl font-extrabold text-gray-800">
                GRAND TOTAL:
              </h3>
              <span className="text-3xl font-extrabold text-[#e6a300]">
                {grandTotal} AZN
              </span>
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-[#006ce4] text-white rounded-lg font-bold text-lg hover:bg-[#0057b8] transition duration-300 shadow-md">
              Complete Reservation!
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 mt-8">
        <Link
          to="/meals"
          className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition duration-300 shadow-md w-max"
        >
          <IoIosArrowBack size={20} /> Back (Hotel and Meal Selection)
        </Link>
      </div>
    </div>
  );
};

export default Step3Configuration;