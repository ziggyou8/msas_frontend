import { useEffect } from 'react';
export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Instagram';
  }, []);

  return (
    <div style={{height:'50vh' }}>
        <h1>
            NOT FOUND PAGE
        </h1>
    </div>
  );
}