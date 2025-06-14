import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { getCVs } from "@/utils/userApi";
import { Download, Eye, FileText, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useState } from "react";

const CV = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showViewer, setShowViewer] = useState(false);
  const [zoom, setZoom] = useState(1);
  const { user } = useAuth();
  const pageSize = 10;

  // Fetch CV data here
  const fetchCV = async (pageNum = 0, reset = false) => {
    try {
      const CVs = await getCVs(user.user_id, pageNum, pageSize);
      console.log('tuan',CVs);
      setCvData(CVs.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch CV:", error);
      setLoading(false);
    }
  };

  const currentCV = cvData && cvData.length > 0 ? cvData[0] : null;

  // Create full URL for the CV (assuming your backend serves files)
  const cvUrl = currentCV
    ? `${"https://backend.matchlent.xyz" || ""}${currentCV.url}`
    : null;

  const handleDownload = () => {
    if (cvData) {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  useEffect(() => {
    if (user != null) {
      fetchCV();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!currentCV) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
          <FileText className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có CV</h3>
        <p className="text-gray-500 mb-4">
          Tải lên CV của bạn để hiển thị cho nhà tuyển dụng
        </p>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
          Tải lên CV
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CV Preview Card */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Loại: {currentCV.type}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
              onClick={() => setShowViewer(true)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Xem
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Tải xuống
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>Định dạng: PDF</p>
          <p>Đường dẫn: {currentCV.url}</p>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {showViewer && cvUrl && (
        <div className="inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full h-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                CV Preview
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowViewer(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
              <div className="flex justify-center">
                <div
                  className="bg-white shadow-lg"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                  }}
                >
                  {/* PDF Viewer */}
                  <iframe
                    src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-[800px] border-0"
                    title="CV Document"
                    onError={() => {
                      console.log(
                        "Iframe PDF viewing not supported, opening in new tab"
                      );
                    }}
                  />

                  {/* Fallback link if iframe doesn't work */}
                  <div className="p-4 text-center bg-gray-50 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      Không thể hiển thị PDF trong trình duyệt?
                    </p>
                    <a
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      Mở trong tab mới
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CV;
