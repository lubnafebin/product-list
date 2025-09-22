import { Banner } from "../components/banner/Banner";
import { CategoryBar } from "../components/category/CategoryBar";
import { Footer } from "../components/footer/Footer";
import { ProductGrid } from "../components/products/ProductGrid";
import { useAppContext } from "../context/AppContext";

export const Home = () => {
  const { selectedCategory, setSelectedCategory } = useAppContext();
  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 40,
      category: "Fruits&Berries",
      image:
        "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9tYXRvfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "Organic Spinach",
      price: 30,
      category: "Leafy Greens",
      image:
        "https://media.istockphoto.com/id/1322565117/photo/fresh-spinach-leaves-on-wooden-cutting-board-on-old-dark-wooden-table-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=ka9P9nvZ8p0Mju59cLY0TjA9Q2iuALbzYiQOXqDunkU=",
    },
    {
      id: 3,
      name: "Carrots",
      price: 50,
      category: "Root Vegetables",
      image:
        "https://images.unsplash.com/photo-1639086495429-d60e72c53c81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnJvdHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "Broccoli",
      price: 80,
      category: "Vegetables",
      image:
        "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Organic Spinach",
      price: 30,
      category: "Leafy Greens",
      image:
        "https://media.istockphoto.com/id/1322565117/photo/fresh-spinach-leaves-on-wooden-cutting-board-on-old-dark-wooden-table-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=ka9P9nvZ8p0Mju59cLY0TjA9Q2iuALbzYiQOXqDunkU=",
    },
  ];
  const filteredProduct =
    selectedCategory === "All Vegetables"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  return (
    <>
      <CategoryBar
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Banner />
      <ProductGrid products={filteredProduct} />
      <Footer />
    </>
  );
};
