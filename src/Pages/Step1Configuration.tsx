import { IoIosArrowDown } from "react-icons/io";
import { countries } from "../Data/Countries";
import { boardTypes } from "../Data/BoardTypes";
import { trendingDestinations } from "../Data/TrendingDestinations";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store";
import { updateConfig, type BoardType } from "../Store/bookingSlice";
import Card from "../Components/Card";

const Step1Configuration = () => {
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => state.book);

  const [localTripDays, setLocalTripDays] = useState(String(config.tripDays));

  useEffect(() => {
    if (config.tripDays !== parseInt(localTripDays, 10)) {
      setLocalTripDays(String(config.tripDays));
    }
  }, [config.tripDays]);

  const handleClick = (country: string) => {
    dispatch(updateConfig({ selectedCountry: country }));
    setDropdown(false);
  };
  const clickDestination = (destination: string) => {
    dispatch(updateConfig({ selectedDestination: destination }));
    setDropdown2(false);
  };

  const handleTripDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalTripDays(value);

    if (value === "") {
      return;
    }

    const days = parseInt(value, 10);
    if (days >= 1) {
      dispatch(updateConfig({ tripDays: days }));
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateConfig({ startDate: e.target.value }));
  };

  const handleBoardTypeChange = (code: string) => {
  dispatch(updateConfig({ selectedBoardType: code as BoardType })); 
 };

  return (
    <div>
      <div className="bg-[#002f72]">
        <div className="h-[300px] container mx-auto pt-20 md:pt-[140px]">
          <div className="flex items-start gap-2 flex-col">
            <h1 className="text-3xl text-white font-medium">Plan Your Trip</h1>
            <h2 className="text-xl text-white font-medium">
              Search for hotels, homes, and more...
            </h2>
          </div>
          <div className="w-full bg-[#ffb700] mt-5 md:mt-15 p-1 md:px-1.5 rounded-lg">
            <div className="w-full flex items-center flex-col md:flex-row gap-1">
              <div className="flex items-start flex-col w-full relative">
                <button
                  onClick={() => setDropdown((prev) => !prev)}
                  className="w-full bg-white cursor-pointer! rounded-lg border-0 text-[#1a1a1a] text-sm font-medium flex items-center justify-between px-2 py-3"
                >
                  <span>{config.selectedCountry}</span>
                  <IoIosArrowDown size={15} />
                </button>
                <ul
                  className={`bg-white border-b border-x border-[#0000001A] shadow-xl overflow-hidden transition-all z-50 top-12 absolute duration-500 ${
                    dropdown
                      ? "max-h-[345px] transform-y-[150px]"
                      : "max-h-0 transform-y-0"
                  } rounded-b-lg w-full -mt-2.5 pt-2.5 text-[#1a1a1a] font-medium text-sm`}
                >
                  <li
                    onClick={() => handleClick("Azerbaijan")}
                    className="cursor-pointer hover:bg-[#1a1a1a0f] w-full p-2"
                  >
                    Azerbaijan
                  </li>
                  <li
                    onClick={() => handleClick("Turkey")}
                    className="cursor-pointer hover:bg-[#1a1a1a0f] w-full p-2"
                  >
                    Turkey
                  </li>
                  <li
                    onClick={() => handleClick("USA")}
                    className="cursor-pointer hover:bg-[#1a1a1a0f] w-full p-2"
                  >
                    USA
                  </li>
                </ul>
              </div>
              <div className="flex items-start flex-col w-full mt-1">
                <input
                  type="date"
                  value={config.startDate}
                  onChange={handleStartDateChange}
                  placeholder="Start Date"
                  className="w-full bg-white border-0 rounded-lg py-3 px-2 text-sm font-medium focus:border-0 focus:outline-0"
                />
              </div>
              <div className="flex items-start flex-col w-full">
                <input
                  type="number"
                  onChange={handleTripDaysChange}
                  placeholder="Trip Days (ex: 1)"
                  min={1}
                  className="w-full bg-white border-0 rounded-lg py-3 px-2 text-sm focus:outline-0 focus:border-0 text-[#1a1a1a]! font-medium"
                />
              </div>
              <div className="flex items-start flex-col w-full relative">
                <button
                  onClick={() => setDropdown2((prev) => !prev)}
                  className="w-full bg-white cursor-pointer! rounded-lg border-0 text-[#1a1a1a] text-sm font-medium flex items-center justify-between px-2 py-3"
                >
                  <span>{config.selectedDestination}</span>
                  <IoIosArrowDown size={15} />
                </button>
                <ul
                  className={`bg-white border-b border-x border-[#0000001A] shadow-xl overflow-hidden transition-all duration-500 absolute top-12 z-50 ${
                    dropdown2
                      ? "max-h-[345px] transform-y-[150px]"
                      : "max-h-0 transform-y-0"
                  } rounded-b-lg w-full -mt-2.5 pt-2.5 text-[#1a1a1a] font-medium text-sm`}
                >
                  {countries.map((d) => (
                    <li
                      key={d.id}
                      onClick={() => clickDestination(d.name)}
                      className="cursor-pointer hover:bg-[#1a1a1a0f] w-full p-2"
                    >
                      {d.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full py-2">
                <span className="text-sm font-medium">Board Types</span>
                <div className="flex items-center w-full justify-between">
                  {boardTypes.map((item) => (
                    <label
                      title={item.name}
                      key={item.name}
                      className="px-3 flex items-center gap-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={item.name}
                        value={item.code}
                        checked={config.selectedBoardType === item.code}
                        onChange={() => handleBoardTypeChange(item.code)}
                      />
                      <span className="text-sm font-medium text-[#1a1a1a] pb-[0.5]">
                        {item.code}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <Link
                  to="/meals"
                  className="w-full text-center text-white font-medium rounded-sm text-xl flex items-center justify-center h-[50px] bg-[#006ce4] hover:bg-[#0057b8] cursor-pointer transition duration-300"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-[200px] md:pt-[100px]">
        <div>
          <h2 className="text-2xl text-[#1a1a1a] font-bold">
            Trending destinations
          </h2>
          <div className="text-base text-[#595959]">
            Most popular choices for travelers from Azerbaijan
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {trendingDestinations.map((dest) => (
            <div key={dest.id} className="mt-4">
              <Card
                key={dest.id}
                destination={dest.destinationName}
                flag={dest.flag}
                imageUrl={dest.imageUrl}
                onClick={clickDestination}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1Configuration;
