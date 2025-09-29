// Shared UI components for TRYONYOU monorepo
export const Button = ({ children, ...props }) => {
  return <button className="tryonyou-btn" {...props}>{children}</button>;
};

export const Card = ({ children, ...props }) => {
  return <div className="tryonyou-card" {...props}>{children}</div>;
};