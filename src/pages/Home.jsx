import { Banner } from "../components/banner/Banner";
import { CategoryBar } from "../components/category/CategoryBar";
import { Footer } from "../components/footer/Footer";
import { ProductGrid } from "../components/products/ProductGrid";
import { useAppContext } from "../context/AppContext";

export const Home = () => {
  const { selectedCategory, setSelectedCategory, productslist } = useAppContext();

  const filteredProduct =
    selectedCategory === "All Products"
      ? productslist
      : productslist.filter((p) => p.category === selectedCategory);
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
