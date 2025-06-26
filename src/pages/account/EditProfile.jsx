import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { changeUserInformation } from "@/utils/userApi";
import { City, Country, State } from "country-state-city";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building,
  CheckCircle,
  FileText,
  MapPin,
  Phone,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const { userInformation } = location.state || {};

  // form state
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);

  const SEA_COUNTRIES = [
    "ID", // Indonesia
    "MY", // Malaysia
    "PH", // Philippines
    "SG", // Singapore
    "TH", // Thailand
    "VN", // Vietnam
    "KH", // Cambodia
    "LA", // Laos
    "MM", // Myanmar
    "BN", // Brunei
    "TL", // Timor-Leste
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");
    try {
      await changeUserInformation(user.user_id, {
        full_name: fullName,
        job_title: jobTitle,
        about_me: aboutMe,
        country: country,
        state: state,
        city: city,
        phone: phone,
        // date_of_birth: dateOfBirth
      });
      setSaveSuccess(true);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      console.error(err);
      setSaveError("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (userInformation) {
      setFullName(userInformation.full_name || "");
      setJobTitle(userInformation.job_title || "");
      setAboutMe(userInformation.summary || "");
      setPhone(userInformation.phone_number || "");
      setCountry(userInformation.country || "");
      setState(userInformation.state || "");
      setCity(userInformation.city || "");
      setDateOfBirth(userInformation.date_of_birth || "");
    }
  }, [userInformation]);

  useEffect(() => {
    const all = Country.getAllCountries();
    const filtered = all.filter((c) => SEA_COUNTRIES.includes(c.isoCode));
    setAvailableCountries(filtered);
  }, []);

  useEffect(() => {
    if (country) {
      const selectedCountry = Country.getAllCountries().find(
        (c) => c.name === country
      );

      if (selectedCountry) {
        const states = State.getStatesOfCountry(selectedCountry.isoCode);
        setAvailableStates(states);
        setState("");
        setCity("");
      }
    } else {
      setAvailableStates([]);
      setState("");
      setCity("");
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      const selectedCountry = Country.getAllCountries().find(
        (c) => c.name === country
      );
      const selectedState = State.getStatesOfCountry(
        selectedCountry?.isoCode
      ).find((s) => s.name === state);

      if (selectedCountry && selectedState) {
        const cities = City.getCitiesOfState(
          selectedCountry.isoCode,
          selectedState.isoCode
        );
        setAvailableCities(cities);
        setCity("");
      }
    } else {
      setAvailableCities([]);
      setCity("");
    }
  }, [state, country]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-2xl mx-auto -mt-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/profile">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4 hover:bg-purple-50 border-purple-200 text-purple-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Profile
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Điều chỉnh trang cá nhân
          </h1>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 animate-pulse">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-sm text-red-800">{saveError}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-pulse">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-sm text-green-800">
                Lưu lại thông tin, chờ chuyển hướng
              </p>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ tên
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-purple-500" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chức danh công việc
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-4 w-4 text-purple-500" />
              </div>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thông tin về tôi
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText className="h-4 w-4 text-purple-500" />
              </div>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={4}
                className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đất nước
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-purple-500" />
                </div>
                <select
                  value={country}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setCountry(selected);
                    if (!selected) {
                      setAvailableStates([]);
                      setAvailableCities([]);
                    }
                  }}
                  className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 bg-white/80"
                >
                  <option value="">Chọn quốc gia</option>
                  {availableCountries.map((c) => (
                    <option key={c.isoCode} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tỉnh thành
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-purple-500" />
                </div>
                <select
                  value={state}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setState(selected);
                    if (!selected) {
                      setAvailableCities([]);
                    }
                  }}
                  className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 bg-white/80"
                >
                  <option value="">Chọn tỉnh/thành</option>
                  {availableStates.map((s) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-purple-500" />
                </div>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 bg-white/80"
                >
                  <option value="">Chọn thành phố</option>
                  {availableCities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số diện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-purple-500" />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                />
              </div>

              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày tháng năm sinh
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isSaving || saveSuccess}
          >
            {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Lưu profile"}
          </Button>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            disabled={isSaving}
            onClick={() => navigate("/profile")}
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
