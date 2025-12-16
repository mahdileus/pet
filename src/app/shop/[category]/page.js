// app/shop/[category]/page.jsx

export default function CategoryPage({ params }) {
  const { category } = params;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">دسته: {category}</h1>
      <AllP mainCategory="onlineshop" categorySlug={category} />
    </div>
  );
}