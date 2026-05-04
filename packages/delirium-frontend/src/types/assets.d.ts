// Override Next.js default image import types.
// Our webpack config uses asset/resource which returns a URL string,
// same as Vite — so existing component imports don't need changing.
declare module "*.png" { const src: string; export default src; }
declare module "*.jpg" { const src: string; export default src; }
declare module "*.jpeg" { const src: string; export default src; }
declare module "*.gif" { const src: string; export default src; }
declare module "*.webp" { const src: string; export default src; }
declare module "*.mp4" { const src: string; export default src; }
