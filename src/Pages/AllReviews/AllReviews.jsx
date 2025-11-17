import { useLoaderData } from "react-router";
import { Star } from "lucide-react";

const AllReviews = () => {
  const reviews = useLoaderData();
  console.log(reviews);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">All Reviews</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-white rounded-xl shadow-md p-5 transform transition hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
              <img
                src={rev.img}
                alt="review"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <p className="text-lg font-semibold">{rev.rating}</p>
            </div>

            {/* Comment */}
            <p className="text-gray-700 text-sm mb-3">{rev.comment}</p>

            {/* Date */}
            <p className="text-xs text-gray-400">
              {new Date(rev.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
