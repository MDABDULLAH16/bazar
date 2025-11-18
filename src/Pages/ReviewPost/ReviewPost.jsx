import { useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const ReviewPost = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [name,setName]= useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      img: imgUrl,
      name,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    // console.log("Review Submitted:", reviewData);

    //  send data to backend
    fetch(`${BACKEND_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    }).then(res => res.json()).then(data => {
        if (data.insertedId) {
            toast.success('Review Post Successful')
        }
    });

    setImgUrl("");
    setRating("");
    setComment("");
    setName('')
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-5 text-center">Post a Review</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Product name</label>
          <input
            type="text"
            placeholder="Product name"
            value={imgUrl}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            placeholder="Enter Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">Rating (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block font-medium mb-1">Comment</label>
          <textarea
            rows="4"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#FBBD23] text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewPost;
