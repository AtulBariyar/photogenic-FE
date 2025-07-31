import { useState } from "react";

export default function AuthForm({ type, onSubmit, loading, switchFormType }) {
  const [formData, setFormData] = useState(
    type === "login"
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center">
        <img
          src="https://placehold.co/300x100"
          alt="Editor Pro logo with geometric camera icon"
          className="h-16"
        />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {type === "login" ? "Sign In" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        {type === "register" && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {type === "register" && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
        >
          {loading ? (
            <>
              Processing...
            </>
          ) : type === "login" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="text-center text-sm">
        <button
          onClick={switchFormType}
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          {type === "login"
            ? "Need an account? Register"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
