import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { City, Country, State } from "country-state-city";
import { motion } from "framer-motion";
import {
  Code,
  Filter,
  MapPin,
  Plus,
  RefreshCw,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchFilter({
  filters,
  setFilters,
  inputValues,
  setInputValues,
  onSearch,
}) {
  const SEA_COUNTRIES = [
    "ID",
    "MY",
    "PH",
    "SG",
    "TH",
    "VN",
    "KH",
    "LA",
    "MM",
    "BN",
    "TL",
  ];
  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const addToArray = (field, value) => {
    if (value.trim() && !filters[field].includes(value.trim())) {
      setFilters((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setInputValues((prev) => ({
        ...prev,
        [`${field}Input`]: "",
      }));
    }
  };

  const removeFromArray = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputKeyPress = (e, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputField = field.replace("Input", "");
      addToArray(inputField, inputValues[field]);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      city: [],
      state: [],
      country: [],
      dateOfBirth: "",
      skill: [],
      certification: [],
    });
    setInputValues({
      cityInput: "",
      stateInput: "",
      countryInput: "",
      skillInput: "",
      certificationInput: "",
    });
  };

  const handleSearch = () => {
    onSearch();
  };

useEffect(() => {
  const seaCountries = Country.getAllCountries().filter((c) =>
    SEA_COUNTRIES.includes(c.isoCode)
  );
  setAvailableCountries(seaCountries);
}, []);

// 2. When country name changes, fetch states
useEffect(() => {
  console.log(availableCountries.length);
    console.log("Triggered");
  if (availableCountries.length > 0) {
    const selectedCountry = availableCountries.find(
      (c) => c.name === availableCountries
    );

    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.isoCode);
      setAvailableStates(states);
    } else {
      setAvailableStates([]);
    }

    // Reset state & city selections
    setAvailableCities([]);
    setInputValues((prev) => ({ ...prev, stateInput: "", cityInput: "" }));
  } else {
    setAvailableStates([]);
  }
}, [availableCountries]);

// 3. When state name changes, fetch cities
useEffect(() => {
  if (inputValues.stateInput && availableStates.length > 0) {
    // Find the selected country from availableCountries
    const selectedCountry = availableCountries.find(
      (c) => c.name === inputValues.countryInput
    );

    // Find the selected state from availableStates (not from input)
    const selectedState = availableStates.find(
      (s) => s.name === availableStates
    );
    if (selectedCountry && selectedState) {
      const cities = City.getCitiesOfState(
        availableCountries.isoCode,
        availableStates.isoCode
      );
      setAvailableCities(cities);
    } else {
      setAvailableCities([]);
    }

    // Reset city selection
    setInputValues((prev) => ({ ...prev, cityInput: "" }));
  } else {
    setAvailableCities([]);
  }
}, [availableCountries, availableStates]);

  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm p-5 border border-gray-100 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-semibold text-gray-900 flex items-center">
          <Filter className="h-4 w-4 mr-2 text-gray-600" />
          Bộ Lọc Tìm Kiếm
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-0 h-7 w-7"
          onClick={clearAllFilters}
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Location Filters */}
      <div className="space-y-4 mb-5">
        <h3 className="text-sm font-medium text-gray-800 flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-2 text-gray-600" />
          Địa Điểm
        </h3>

        {/* Country Filter */}
        <div className="space-y-2">
          <label className="text-xs text-gray-600 font-medium">Quốc Gia</label>
          <div className="flex gap-2 mb-2">
            <select
              value={inputValues.countryInput}
              onChange={(e) => {
                const selected = e.target.value;
                handleInputChange("countryInput", e.target.value);
                if (!selected) {
                  setAvailableStates([]);
                  setAvailableCities([]);
                  setInputValues((prev) => ({
                    ...prev,
                    stateInput: "",
                    cityInput: "",
                  }));
                }
              }}
              className="text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-8 w-full rounded-md"
            >
              <option value="">Chọn quốc gia...</option>
              {availableCountries.map((c) => (
                <option key={c.isoCode} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button
              size="icon"
              onClick={() => addToArray("country", inputValues.countryInput)}
              disabled={!inputValues.countryInput.trim()}
              className="bg-gray-700 hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.country.map((country, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border border-gray-200"
              >
                {country}
                <button
                  onClick={() => removeFromArray("country", country)}
                  className="ml-1.5 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>

        {/* State Filter */}
        <div className="space-y-2">
          <label className="text-xs text-gray-600 font-medium">
            Tỉnh/Thành
          </label>
          <div className="flex gap-2 mb-2">
            <select
              value={inputValues.stateInput}
              onChange={(e) => {
                const selected = e.target.value;
                handleInputChange("stateInput", selected);
                if (!selected) {
                  setAvailableCities([]);
                  setInputValues((prev) => ({
                    ...prev,
                    cityInput: "",
                  }));
                }
              }}
              disabled={!availableStates.length}
              className="text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-8 w-full rounded-md"
            >
              <option value="">Chọn tỉnh/thành...</option>
              {availableStates.map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <Button
              size="icon"
              onClick={() => addToArray("state", inputValues.stateInput)}
              disabled={!inputValues.stateInput.trim()}
              className="bg-gray-700 hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.state.map((state, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border border-gray-200"
              >
                {state}
                <button
                  onClick={() => removeFromArray("state", state)}
                  className="ml-1.5 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <label className="text-xs text-gray-600 font-medium">Thành Phố</label>
          <div className="flex gap-2 mb-2">
            <select
              value={inputValues.cityInput}
              onChange={(e) => handleInputChange("cityInput", e.target.value)}
              disabled={!availableCities.length}
              className="text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-8 w-full rounded-md"
            >
              <option value="">Chọn thành phố...</option>
              {availableCities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button
              size="icon"
              onClick={() => addToArray("city", inputValues.cityInput)}
              disabled={!inputValues.cityInput.trim()}
              className="bg-gray-700 hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.city.map((city, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border border-gray-200"
              >
                {city}
                <button
                  onClick={() => removeFromArray("city", city)}
                  className="ml-1.5 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Date of Birth */}
      {/* <div className="space-y-2 mb-5">
        <h3 className="text-sm font-medium text-gray-800 flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-2 text-gray-600" />
          Ngày Sinh
        </h3>
        <Input
          type="date"
          value={filters.dateOfBirth}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, dateOfBirth: e.target.value }))
          }
          className="text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-8"
        />
      </div> */}

      {/* Skills Section */}
      <div className="space-y-2 mb-5">
        <h3 className="text-sm font-medium text-gray-800 flex items-center">
          <Code className="h-3.5 w-3.5 mr-2 text-gray-600" />
          Kỹ Năng
        </h3>
        <div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Thêm kỹ năng..."
              value={inputValues.skillInput}
              onChange={(e) => handleInputChange("skillInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "skillInput")}
              className="text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-8"
            />
            <Button
              size="icon"
              onClick={() => addToArray("skill", inputValues.skillInput)}
              disabled={!inputValues.skillInput.trim()}
              className="bg-gray-700 hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.skill.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200"
              >
                {skill}
                <button
                  onClick={() => removeFromArray("skill", skill)}
                  className="ml-1.5 hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      {/* <div className="space-y-2 mb-6">
        <h3 className="text-sm font-medium text-gray-800 flex items-center">
          <Award className="h-3.5 w-3.5 mr-2 text-gray-600" />
          Chứng Chỉ
        </h3>
        <div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Thêm chứng chỉ..."
              value={inputValues.certificationInput}
              onChange={(e) =>
                handleInputChange("certificationInput", e.target.value)
              }
              onKeyUp={(e) => handleInputKeyPress(e, "certificationInput")}
              className="text-sm border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-8"
            />
            <Button
              size="icon"
              onClick={() =>
                addToArray("certification", inputValues.certificationInput)
              }
              disabled={!inputValues.certificationInput.trim()}
              className="bg-gray-700 hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.certification.map((cert, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-700 text-xs rounded-md border border-green-200"
              >
                {cert}
                <button
                  onClick={() => removeFromArray("certification", cert)}
                  className="ml-1.5 hover:bg-green-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      </div> */}
    </aside>
  );
}
