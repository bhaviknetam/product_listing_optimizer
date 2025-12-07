import React from 'react';

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>;
}

export default function CompareView({ original, optimized, loading }) {
  const Card = ({ title, children }) => (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );

  const Item = ({ label, children }) => (
    <div className="mb-5">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <div className="text-gray-800 leading-relaxed">{children}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {[1, 2].map((x) => (
          <Card key={x} title={x === 1 ? "Original" : "Optimized"}>
            <Item label="Title">
              <Skeleton className="h-4 w-3/4" />
            </Item>

            <Item label="Bullet Points">
              {[0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-3 w-full mb-2" />)}
            </Item>

            <Item label="Description">
              <Skeleton className="h-20 w-full" />
            </Item>

            {x === 2 && (
              <Item label="Keywords">
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </Item>
            )}
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card title="Original">
        <Item label="Title">{original?.title}</Item>
        <Item label="Bullet Points">
          <ul className="list-disc ml-4 space-y-1">
            {original?.bullets?.length ? (
              original.bullets.map((b, i) => <li key={i}>{b}</li>)
            ) : (
              <li className="text-gray-400 italic">No bullet points available</li>
            )}
          </ul>
        </Item>
        <Item label="Description">
          {original?.description || <span className="text-gray-400 italic">No description available</span>}
        </Item>
      </Card>

      <Card title="Optimized">
        <Item label="Title">{optimized?.title}</Item>

        <Item label="Bullet Points">
          <ul className="list-disc ml-4 space-y-1">
            {optimized?.bullets?.length ? (
              optimized.bullets.map((b, i) => <li key={i}>{b}</li>)
            ) : (
              <li className="text-gray-400 italic">No bullet points available</li>
            )}
          </ul>
        </Item>

        <Item label="Description">
          {optimized?.description || <span className="text-gray-400 italic">No description available</span>}
        </Item>

        {optimized?.keywords?.length > 0 && (
          <Item label="Keywords">
            <div className="flex flex-wrap gap-2">
              {optimized.keywords.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {k}
                </span>
              ))}
            </div>
          </Item>
        )}
      </Card>
    </div>
  );
}
