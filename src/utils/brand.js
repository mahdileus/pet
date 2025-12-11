// utils/brand.js
export function slugify(text = "") {
  return text
    .toString()
    .normalize("NFKD") // remove accents
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase();
}

export function validateBrandPayload({ name, website }) {
  if (!name || name.trim().length < 2) return "نام برند حداقل ۲ کاراکتر باید باشد.";
  if (website && !/^https?:\/\//.test(website)) return "website باید با http:// یا https:// شروع شود.";
  return null;
}
