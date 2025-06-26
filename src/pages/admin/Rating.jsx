"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllRatingAnalytic } from "@/utils/adminAPI";
import { getUserById } from "@/utils/userApi";
import { Filter, MessageSquare, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const StatCard = ({ title, value, subtitle, icon: Icon, color = "purple" }) => {
  const colorClasses = {
    purple: "from-purple-500 to-blue-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-indigo-500",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} rounded-lg p-3`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>
        <p className="text-gray-600 font-medium">{title}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

const RatingBar = ({ rating, count, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center gap-1 w-12">
        <span className="text-sm font-medium text-gray-700">{rating}</span>
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      </div>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
    </div>
  );
};

const FeedbackCard = ({ feedback, user }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 border-2 border-purple-100">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold text-xs">
            U
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-800 text-sm">
              {user?.data.user_information.full_name || `User ${feedback.user_id}`}
            </h4>
            <div className="flex items-center gap-1">
              <span
                className={`font-semibold text-sm ${getRatingColor(
                  feedback.value
                )}`}
              >
                {feedback.value}
              </span>
              <Star
                className={`h-3 w-3 fill-current ${getRatingColor(
                  feedback.value
                )}`}
              />
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {feedback.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

const RatingComponent = () => {
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [users, setUsers] = useState({});
  const [filterRating, setFilterRating] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const ratingsData = await getAllRatingAnalytic(0, 10000); // Get all ratings
        setRatings(ratingsData);
        setFilteredRatings(ratingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (ratings.length === 0) return;

      try {
        // Get unique user IDs from ratings
        const uniqueUserIds = [
          ...new Set(ratings.map((rating) => rating.user_id)),
        ];
        const userPromises = uniqueUserIds.map(async (userId) => {
          try {
            const user = await getUserById(userId);
            return { userId, user };
          } catch (error) {
            console.error(`Failed to fetch user ${userId}:`, error);
            return { userId, user: null };
          }
        });

        const userResults = await Promise.all(userPromises);
        const usersMap = {};
        userResults.forEach(({ userId, user }) => {
          usersMap[userId] = user;
        });

        setUsers(usersMap);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [ratings]);

  useEffect(() => {
    if (filterRating === "all") {
      setFilteredRatings(ratings);
    } else {
      setFilteredRatings(
        ratings.filter(
          (rating) => rating.value === Number.parseInt(filterRating)
        )
      );
    }
  }, [filterRating, ratings]);

  // Calculate statistics from real data
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0
      ? (
          ratings.reduce((sum, rating) => sum + rating.value, 0) / totalRatings
        ).toFixed(1)
      : 0;
  const totalFeedbacks = ratings.filter(
    (rating) => rating.comment && rating.comment.trim() !== ""
  ).length;

  // Calculate rating distribution
  const ratingDistribution = {
    5: ratings.filter((r) => r.value === 5).length,
    4: ratings.filter((r) => r.value === 4).length,
    3: ratings.filter((r) => r.value === 3).length,
    2: ratings.filter((r) => r.value === 2).length,
    1: ratings.filter((r) => r.value === 1).length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading ratings: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Ratings & Feedback Analytics
        </h2>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Rating Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Ratings"
          value={totalRatings}
          subtitle="From all users"
          icon={Star}
          color="orange"
        />
        <StatCard
          title="Average Rating"
          value={averageRating}
          subtitle="Out of 5 stars"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Total Feedback"
          value={totalFeedbacks}
          subtitle="Detailed responses"
          icon={MessageSquare}
          color="blue"
        />
      </div>

      {/* Rating Distribution and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Rating Distribution
          </h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <RatingBar
                key={rating}
                rating={rating}
                count={ratingDistribution[rating]}
                total={totalRatings}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Statistics Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Positive (4-5★)</span>
              <span className="font-semibold text-green-600 text-xl">
                {totalRatings > 0
                  ? Math.round(
                      ((ratingDistribution[4] + ratingDistribution[5]) /
                        totalRatings) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Neutral (3★)</span>
              <span className="font-semibold text-yellow-600 text-xl">
                {totalRatings > 0
                  ? Math.round((ratingDistribution[3] / totalRatings) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Negative (1-2★)</span>
              <span className="font-semibold text-red-600 text-xl">
                {totalRatings > 0
                  ? Math.round(
                      ((ratingDistribution[1] + ratingDistribution[2]) /
                        totalRatings) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      {totalFeedbacks > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Feedback (
            {
              filteredRatings.filter(
                (r) => r.comment && r.comment.trim() !== ""
              ).length
            }
            )
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredRatings
              .filter(
                (rating) => rating.comment && rating.comment.trim() !== ""
              )
              .map((rating) => (
                <FeedbackCard
                key={rating.id}
                feedback={rating}
                user={users[rating.user_id]}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingComponent;
