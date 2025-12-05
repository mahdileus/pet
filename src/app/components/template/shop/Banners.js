export default function Banners() {
  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-xl overflow-hidden">
          <img
            src="/images/shop-banner-1.jpg"
            className="w-full h-full object-cover"
            alt="banner"
          />
        </div>

        <div className="rounded-xl overflow-hidden">
          <img
            src="/images/shop-banner-2.jpg"
            className="w-full h-full object-cover"
            alt="banner"
          />
        </div>

        <div className="rounded-xl overflow-hidden">
          <img
            src="/images/shop-banner-3.jpg"
            className="w-full h-full object-cover"
            alt="banner"
          />
        </div>

        <div className="rounded-xl overflow-hidden">
          <img
            src="/images/shop-banner-4.jpg"
            className="w-full h-full object-cover"
            alt="banner"
          />
        </div>

      </div>
    </div>
  );
}
