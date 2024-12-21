// pages/blog.js
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const featuredPost = {
  id: 1,
  title: "The Future of AI in Healthcare: Exploring What's Next",
  author: "George Laliotis",
  date: "July 3, 2023",
  readTime: "6 min read",
  description:
    "The future of artificial intelligence in healthcare is here. Learn about what advancements are taking place and what they can mean for you.",
  imageUrl: "/img/blog.jpg", // Replace with your actual image path
  category: "Healthcare",
};

const blogPosts = [
  {
    id: 2,
    title: "AI in Medical Diagnosis",
    description: "An in-depth look at how AI is transforming medical diagnosis and patient care.",
    imageUrl: "/img/blog2.jpg",
    category: "Medical",
    date: "October 20, 2024",
  },
  // Add more posts as needed
];

const categories = ["All", "Healthcare", "Medical", "Technology", "Research"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-12 px-6 text-[#0d1945]">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl font-bold text-[#1a237e]">CareValue Health Blog - Insights Into AI-Powered Healthcare</h1>
        <p className="text-lg text-gray-600 mt-4">
          Welcome to CareValue Health Blog, your one-stop source for the latest news, insights, and advancements in AI-powered healthcare.
        </p>
      </div>

      {/* Featured Post */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden mb-12 max-w-6xl mx-auto">
        <Image
          src={featuredPost.imageUrl}
          alt={featuredPost.title}
          width={500}
          height={300}
          className="w-full md:w-1/2 object-cover"
        />
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-semibold text-[#0d1945]">{featuredPost.title}</h2>
          <div className="text-sm text-gray-500 mt-2">
            <p>Author: <span className="font-semibold text-[#1a237e]">{featuredPost.author}</span></p>
            <p>{featuredPost.date} | {featuredPost.readTime}</p>
          </div>
          <p className="text-gray-700 mt-4">{featuredPost.description}</p>
          <a href={`/blog/${featuredPost.id}`} className="mt-6 inline-block text-[#1a237e] hover:underline font-semibold">
            Read More
          </a>
        </div>
      </div>

      {/* Categories */}
      <div className="flex justify-center space-x-4 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? "bg-[#1a237e] text-white"
                : "bg-white text-[#1a237e] border border-[#1a237e] hover:bg-[#1a237e] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={500}
              height={300}
              className="object-cover w-full h-48"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#0d1945]">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <a href={`/blog/${post.id}`} className="text-[#1a237e] hover:underline font-semibold">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (optional) */}
      <div className="flex justify-center mt-12">
        <button className="px-4 py-2 mx-1 rounded bg-[#1a237e] text-white hover:bg-[#0d1945]">
          Previous
        </button>
        <button className="px-4 py-2 mx-1 rounded bg-[#1a237e] text-white hover:bg-[#0d1945]">
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
