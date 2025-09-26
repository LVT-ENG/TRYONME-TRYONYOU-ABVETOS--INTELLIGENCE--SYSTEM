// Shared UI components for TRYONYOU monorepo
export const Button = ({ children, ...props }) => {
  return `<button class="tryonyou-btn" ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(' ')}>${children}</button>`;
};

export const Card = ({ children }) => {
  return `<div class="tryonyou-card">${children}</div>`;
};