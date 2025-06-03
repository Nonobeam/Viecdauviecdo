import ChatbotButton from "@/components/ui/chatbotButton";
import { getAllCompanies } from "@/utils/companyApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/company/${id}`);
  };

  const fetchCompanies = async (pageNum = 0, reset = false) => {
    try {
      setLoading(true);
      const data = await getAllCompanies(pageNum, pageSize);
      const content = data?.data?.content;

      if (!content || content.length === 0) {
        if (reset) {
          setCompanies([]);
        }
        setHasMore(false);
        setError("No companies found.");
        return;
      }

      if (reset) {
        setCompanies(content);
      } else {
        setCompanies((prev) => [...prev, ...content]);
      }

      setHasMore(content.length === pageSize);
      setError(null);
    } catch (err) {
      setError("Failed to fetch companies");
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCompanies(nextPage, false);
    }
  };

  useEffect(() => {
    fetchCompanies(0, true);
    setPage(0);
  }, []);

  return (
    <div className="h-full overflow-auto p-4">
      {error && (
        <p className="text-center text-muted-foreground mt-4">{error}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {companies.map((company) => (
          <button
            key={company.id}
            className="border rounded-lg overflow-hidden bg-card cursor-pointer"
            onClick={() => handleCardClick(company.id)}
          >
            <div className="relative aspect-[16/9] bg-muted">
              <img
                src={company.image}
                alt={company.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{company.name}</h3>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Company Size: {company.company_size}
                </p>
                <p className="text-sm text-muted-foreground">
                  {company.industry}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <ChatbotButton />
    </div>
  );
};

export default Company;
