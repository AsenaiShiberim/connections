import Image from "next/image";

export default function ArtistCard({ name, image, onClick, selected }) {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 ${
          selected ? 'bg-yellow-300' : 'bg-white'
        }`}
      >
        <Image src={image} alt={name} width={50} height={50} className="rounded-full mb-4" />
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
    );
  }
  