import { apiUrl } from "@/constants";

export default async function Home() {
  const res = await fetch(`${apiUrl}/api/blogs?populate=cover`);
  const data = await res.json();
  console.log(data);

  if (data.data.length === 0) {
    return <div>No articles found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-16 p-8">

      {data.data.map((d: { 
        id: number; 
        title: string; 
        cover: { url: string }[]; 
        publishedAt?: string; 
        category?: string; 
        description?: string; 
      }) => (
        <div
          key={d.id}
          className="w-full max-w-xl bg-white rounded-xl shadow-lg flex flex-col gap-4 p-8 border border-gray-200"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-400">{d.publishedAt ? new Date(d.publishedAt).toLocaleDateString() : "Unknown date"}</span>
            <span className="text-sm text-blue-600 font-semibold">{d.category || "Economy"}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{d.title}</h1>
          <p className="text-gray-600 mb-2">{d.description || "Monthly Economic Review"}</p>
          <div className="flex gap-2">
            <a
              href="#"
              className="text-blue-700 underline hover:text-blue-900 transition"
            >
              Learn more
            </a>
            {d.cover && d.cover.length > 0 && (
              d.cover.map((c: { url: string }, index: number) => (
                <a
                  key={index}
                  href={`/api/download?url=${encodeURIComponent(c.url)}`}
                  download
                  target="_blank"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                >
                  Or download: Eng
                </a>
              ))
            )}
          </div>
        </div>
      ))}

      
      <div className="text-sm text-gray-500">
        Powered by Strapi & Next.js
      </div>

    </div>
  );
}
