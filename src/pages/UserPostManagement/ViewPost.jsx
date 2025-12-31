import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

/* ---------------- POST DATA ---------------- */
const postData = [
  {
    id: 424,
    name: "Tasmiya",
    headline: "Tag line",
    text: "Test tagger",
    postType: "Public",
    address: "Indore, MP, 452016",
    createdAt: "2025-12-08",
    images: [
      "https://i.pravatar.cc/300?img=11",
      "https://i.pravatar.cc/300?img=12",
    ],
  },
  {
    id: 425,
    name: "Ayaan",
    headline: "Exploring Nature",
    text: "Weekend hiking trip with friends 🌄",
    postType: "Private",
    address: "Bhopal, MP, 462001",
    createdAt: "2025-12-10",
    images: [
      "https://i.pravatar.cc/300?img=41",
      "https://i.pravatar.cc/300?img=67",
    ],
  },
];


export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const selectedPost = postData.find(
      (p) => Number(p.id) === Number(id)
    );

    if (!selectedPost) {
      navigate("/posts", { replace: true });
      return;
    }

    setPost(selectedPost);
  }, [id, navigate]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <PageBreadcrumb pageTitle="View Post" />

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            {post.headline}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Post ID: {post.id}
          </p>
        </div>

        {/* POST INFORMATION */}
        <Section title="Post Information">
          <Grid>
            <Item label="Name" value={post.name} />
            <Item label="Post Headline" value={post.headline} />
            <Item label="Post ID" value={post.id} />
            <Item label="Post Type" value={post.postType} />
            <Item label="Created At" value={post.createdAt} />
            <Item label="Address" value={post.address} />
          </Grid>

          <div className="mt-6">
            <p className="mb-1 text-xs text-gray-500">Post Text</p>
            <p className="text-sm font-medium text-gray-800">
              {post.text}
            </p>
          </div>
        </Section>

        {/* POST IMAGES */}
        <Section title="Images">
          {post.images && post.images.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {post.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Post Image ${index + 1}`}
                  className="h-48 w-full rounded-xl object-cover border"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No images available</p>
          )}
        </Section>
      </div>
    </>
  );
}

/* ===================== REUSABLE UI ===================== */

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h4 className="mb-6 text-lg font-semibold text-gray-800">{title}</h4>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
    {children}
  </div>
);

const Item = ({ label, value }) => (
  <div>
    <p className="mb-1 text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800">
      {value || "-"}
    </p>
  </div>
);
