import { useLoaderData } from "react-router";
import { Star } from "lucide-react";

const AllReviews = () => {
  const reviews = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">All Reviews</h1>

      <div className="space-y-6">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden transform transition hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Left: Image */}
            <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
              <img
                src={rev.img}
                alt="review"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Right: Name, Rating, Comment, Date */}
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                {/* Name */}
                <h3 className="text-lg font-semibold mb-2">{rev.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <p className="text-sm font-medium">{rev.rating}</p>
                </div>

                {/* Comment */}
                <p className="text-gray-700 text-sm">{rev.comment}</p>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-4 text-right">
                {new Date(rev.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
