import { Badge } from "@/components/ui/badge";
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

  const fetchCompanies = async (pageNum = 0, reset = false) => {
    try {
      setLoading(true);
      const data = await getAllCompanies(pageNum, pageSize);

      if (reset) {
        setCompanies(data.data.content);
      } else {
        setCompanies((prev) => [...prev, ...data]);
      }

      // Check if we have more data to load
      setHasMore(data.length === pageSize);
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

  const handleCardClick = (id) => {
    navigate(`/company/${id}`);
  };

  useEffect(() => {
    fetchCompanies(0, true);
    setPage(0);
  }, []);

  return (
    <div className="h-full overflow-auto p-4">
      {!loading && companies.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">
            Hiện tại chưa có công ty
          </p>
        </div>
      ) : (
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
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 hover:bg-purple-100"
                  >
                    Pay-to-go
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Company Size: {company.company_size}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {company.about}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      <ChatbotButton />
    </div>
  );
};

export default Company;
