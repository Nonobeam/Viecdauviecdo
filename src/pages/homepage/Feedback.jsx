import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/AuthContext";
import { addRating } from "@/utils/userApi";
import { ArrowLeft, Heart, MessageSquare, Send, Star } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getFillPercentage = (starIndex) => {
    const activeRating = hoverRating || rating;
    const fullStars = Math.floor(activeRating);
    const hasHalfStar = activeRating % 1 >= 0.5;

    if (starIndex < fullStars) return 100;
    if (starIndex === fullStars && hasHalfStar) return 50;
    return 0;
  };

  const handleStarClick = (starIndex, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const starWidth = rect.width;

    // If clicked on left half, set to half star, otherwise full star
    const newRating = clickX < starWidth / 2 ? starIndex + 0.5 : starIndex + 1;
    onRatingChange(newRating);
  };

  const handleStarHover = (starIndex, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const hoverX = event.clientX - rect.left;
    const starWidth = rect.width;

    // If hovering on left half, show half star, otherwise full star
    const hoverValue = hoverX < starWidth / 2 ? starIndex + 0.5 : starIndex + 1;
    setHoverRating(hoverValue);
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((starIndex) => {
        const fillPercent = getFillPercentage(starIndex);
        return (
          <button
            key={starIndex}
            type="button"
            onClick={(e) => handleStarClick(starIndex, e)}
            onMouseMove={(e) => handleStarHover(starIndex, e)}
            onMouseLeave={() => setHoverRating(0)}
            className="relative w-8 h-8 p-0.5 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 rounded"
          >
            {/* Empty Star Background */}
            <Star className="absolute inset-0.5 w-7 h-7 text-gray-300 fill-current" />

            {/* Filled Star with clip for partial fill */}
            <Star
              className="absolute inset-0.5 w-7 h-7 text-yellow-400 fill-current transition-all duration-200"
              style={{
                clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (feedback.trim() === "") {
      alert("Vui lòng nhập phản hồi của bạn");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        value: rating,
        comment: feedback,
        user_id: user.user_id,
      };
      await addRating(payload);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
      navigate(-1);
    }
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 0.5:
        return "Rất không hài lòng";
      case 1:
        return "Rất không hài lòng";
      case 1.5:
        return "Không hài lòng";
      case 2:
        return "Không hài lòng";
      case 2.5:
        return "Bình thường";
      case 3:
        return "Bình thường";
      case 3.5:
        return "Hài lòng";
      case 4:
        return "Hài lòng";
      case 5:
        return "Rất hài lòng";
      default:
        return "Chọn đánh giá của bạn";
    }
  };

  console.log(user)
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-purple-100 max-w-md mx-4">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
            <Heart className="h-12 w-12 text-green-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Cảm ơn bạn!
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Phản hồi của bạn đã được gửi thành công. Chúng tôi sẽ sử dụng ý kiến
            của bạn để cải thiện sản phẩm.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Quay về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>

        <div className="relative max-w-4xl mx-auto px-4 py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại trang chủ</span>
          </Link>

          <div className="text-center">
            <div className="bg-white/10 rounded-full p-4 w-20 h-20 mx-auto mb-6 backdrop-blur-sm">
              <MessageSquare className="h-12 w-12 text-white mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Chúng tôi muốn nghe đánh giá từ bạn
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Đánh giá của bạn giúp chúng tôi không ngừng cải thiện sản phẩm của
              chúng tôi và đưa ra trải nghiệm tốt hơn cho mọi người. Chúng tôi
              trân trọng từng đánh giá và ý kiện mà bạn chia sẻ cho chúng tôi
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="max-w-2xl mx-auto -mt-16 relative z-10 px-4 pb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Đánh giá trải nghiệm của bạn
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn cảm thấy thế nào về sản phẩm của chúng tôi?
              </p>

              <div className="flex flex-col items-center gap-4">
                <StarRating rating={rating} onRatingChange={setRating} />
                <p
                  className={`text-sm font-medium transition-colors ${
                    rating > 0 ? "text-purple-600" : "text-gray-400"
                  }`}
                >
                  {getRatingText(rating)}
                </p>
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label
                htmlFor="feedback"
                className="block text-lg font-semibold text-gray-800 mb-3"
              >
                Chia sẻ chi tiết phản hồi của bạn
              </label>
              <p className="text-gray-600 mb-4">
                Hãy cho chúng tôi biết những gì bạn thích, không thích, hoặc
                muốn cải thiện
              </p>
              <Textarea
                id="feedback"
                placeholder="Viết phản hồi của bạn ở đây... Ví dụ: Tôi thích giao diện của ứng dụng nhưng mong muốn có thêm tính năng..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                className="resize-none border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-base"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Tối thiểu 10 ký tự</p>
                <p className="text-sm text-gray-500">{feedback.length}/1000</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100/50">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Tại sao phản hồi của bạn quan trọng:
              </h3>
              <ul className="text-sm text-gray-700 space-y-2 pl-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2"></div>
                  <span>Giúp chúng tôi hiểu nhu cầu người dùng tốt hơn</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2"></div>
                  <span>Định hướng phát triển tính năng mới</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2"></div>
                  <span>Cải thiện trải nghiệm cho tất cả người dùng</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2"></div>
                  <span>Xây dựng cộng đồng người dùng mạnh mẽ hơn</span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={
                  isSubmitting || rating === 0 || feedback.trim().length < 10
                }
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Đang gửi...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>Gửi phản hồi</span>
                  </div>
                )}
              </Button>

              <p className="text-sm text-gray-500 mt-4">
                Phản hồi của bạn sẽ được xem xét và bảo mật
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
