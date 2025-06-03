import { Input } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function SearchFilter() {
  const [filters, setFilters] = useState({
    city: [],
    state: [],
    country: [],
    dateOfBirth: "",
    skill: [],
    certification: [],
  });

  const [inputValues, setInputValues] = useState({
    cityInput: "",
    stateInput: "",
    countryInput: "",
    skillInput: "",
    certificationInput: "",
  });

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

  return (
    <aside className="w-full md:w-64 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Bộ lọc</h2>
        <Button variant="link" 
        className="text-primary"
        onClick={clearAllFilters}>
          Xoá chọn
        </Button>
      </div>

      {/* Location Filters */}
      <div className="space-y-3">
        <h3 className="font-medium">Location</h3>

        {/* City Filter */}
        <div>
          <label className="text-sm text-gray-600">Cities</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add city..."
              value={inputValues.cityInput}
              onChange={(e) => handleInputChange("cityInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "cityInput")}
            />
            <Button
              size="sm"
              onClick={() => addToArray("city", inputValues.cityInput)}
              disabled={!inputValues.cityInput.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.city.map((city, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {city}
                <button
                  onClick={() => removeFromArray("city", city)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* State Filter */}
        <div>
          <label className="text-sm text-gray-600">States</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add state..."
              value={inputValues.stateInput}
              onChange={(e) => handleInputChange("stateInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "stateInput")}
            />
            <Button
              size="sm"
              onClick={() => addToArray("state", inputValues.stateInput)}
              disabled={!inputValues.stateInput.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.state.map((state, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {state}
                <button
                  onClick={() => removeFromArray("state", state)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Country Filter */}
        <div>
          <label className="text-sm text-gray-600">Countries</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add country..."
              value={inputValues.countryInput}
              onChange={(e) =>
                handleInputChange("countryInput", e.target.value)
              }
              onKeyPress={(e) => handleInputKeyPress(e, "countryInput")}
            />
            <Button
              size="sm"
              onClick={() => addToArray("country", inputValues.countryInput)}
              disabled={!inputValues.countryInput.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.country.map((country, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
              >
                {country}
                <button
                  onClick={() => removeFromArray("country", country)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-3">
        <h3 className="font-medium">Date of Birth</h3>
        <Input
          type="date"
          value={filters.dateOfBirth}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, dateOfBirth: e.target.value }))
          }
        />
      </div>

      {/* Skills Section */}
      <div className="space-y-3">
        <h3 className="font-medium">Skills</h3>
        <div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add skill..."
              value={inputValues.skillInput}
              onChange={(e) => handleInputChange("skillInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "skillInput")}
            />
            <Button
              size="sm"
              onClick={() => addToArray("skill", inputValues.skillInput)}
              disabled={!inputValues.skillInput.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.skill.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
              >
                {skill}
                <button
                  onClick={() => removeFromArray("skill", skill)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="space-y-3">
        <h3 className="font-medium">Certifications</h3>
        <div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add certification..."
              value={inputValues.certificationInput}
              onChange={(e) =>
                handleInputChange("certificationInput", e.target.value)
              }
              onKeyUp={(e) => handleInputKeyPress(e, "certificationInput")}
            />
            <Button
              size="sm"
              onClick={() =>
                addToArray("certification", inputValues.certificationInput)
              }
              disabled={!inputValues.certificationInput.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.certification.map((cert, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
              >
                {cert}
                <button
                  onClick={() => removeFromArray("certification", cert)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button */}
      {/* <Button onClick={handleSearch} className="w-full">
        Apply Filters
      </Button> */}

    </aside>
  );
}
