import { FiDownload } from "react-icons/fi";
import Image from "next/image";
import { PublicationType } from "../types/publication";

export default function PublicationCard({
  slug,
  contentHtml,
  title,
  pdf_url,
  cover_photo,
  publishedAt,
  description,
}: PublicationType) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 flex flex-col">
      {/* Cover Image */}
      {cover_photo && (
        <Image
          src={cover_photo}
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
        <p className="text-gray-700 mb-4">{description}</p>
        <a
          href={`/publications/${slug}`}
          className="text-green-700 font-semibold flex items-center gap-2 hover:underline mb-4"
        >
          Learn more <span className="text-lg">&#8594;</span>
        </a>
        <div className="mt-auto flex items-center gap-2">
          <span className="text-gray-500 text-sm">Or download:</span>
          {pdf_url && (
            <a
              href={pdf_url}
              className="inline-flex items-center gap-2 text-gray-100 bg-[#23313b]/45 px-4 py-2 rounded hover:bg-[#23313b]/80 transition-colors duration-300 text-sm font-medium"
              rel="noopener noreferrer"
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
