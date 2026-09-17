/**
 * VIA ALTO — Asset URL Resolver
 * จัดการเติม Base URL ให้กับรูปภาพและไฟล์ Static ต่างๆ
 * เพื่อให้แสดงผลได้อย่างถูกต้องทั้งบน Localhost (Dev) และ GitHub Pages (Production Sub-path)
 */
const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function assetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

export default assetUrl;
