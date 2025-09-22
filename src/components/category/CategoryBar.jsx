import "./CategoryBar.css";
export const CategoryBar = ({ setSelectedCategory, selectedCategory }) => {
  const categories = [
    "All Vegetables",
    "Leafy Greens",
    "Root Vegetables",
    "Fruits & Berries",
    "Herbs & Spices",
    "Organic",
    "Seasonal",
  ];
  return (
    <div className="category">
      <ul>
        {categories.map((cat) => (
          <li
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};
