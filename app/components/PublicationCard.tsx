import { FiDownload } from "react-icons/fi";
import Image from "next/image";
type Props = {
  id: number;
  title: string;
  cover: { url: string }[];
  publishedAt?: string;
  category?: string;
  description?: string;
};

export default function PublicationCard({
  id,
  title,
  cover,
  publishedAt,
  category,
  description,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col">
      {/* Cover Image */}
      {cover && cover[0]?.url && (
        <Image
            src={cover[0].url}
            alt={title}
            width={400}
            height={192}
            className="rounded-t-lg h-48 w-full object-cover"
        />
      )}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-gray-400 text-sm mb-2">
          {publishedAt ? new Date(publishedAt).toLocaleDateString() : ""}
        </span>
        <h2 className="text-2xl font-bold text-[#23313b] mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{typeof description === 'string' ? description : (description != null ? String(description) : '')}</p>
        <a
          href={`/publications/${id}`}
          className="text-green-700 font-semibold flex items-center gap-2 hover:underline mb-4"
        >
          Learn more <span className="text-lg">&#8594;</span>
        </a>
        <div className="mt-auto flex items-center gap-2">
          <span className="text-gray-500 text-sm">Or download:</span>
          {cover && cover[1]?.url && (
            <a
                href={cover[1].url}
                className="inline-flex items-center gap-2 text-gray-700 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                download
                target="_blank"
            >
                <FiDownload className="text-lg" />
                
            </a>
          )}
        </div>
      </div>
    </div>
  );
}