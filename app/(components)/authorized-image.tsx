import { useState, useEffect } from "react";
import Image from "next/image";

type AuthorizedImageProps = {
  src: string;
  alt: string;
};

const AuthorizedImage = ({ src, alt }: AuthorizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(src, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_TOKEN}`,
            "Access-Control-Allow-Origin": "http://localhost:3001",
          },
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);
        console.log("objectUrl", objectUrl);
        return objectUrl;
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();

    return () => {
      URL.revokeObjectURL(imageSrc || "");
    };
  }, [src]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!imageSrc) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xs object-cover">
      <Image
        src={imageSrc}
        alt={alt}
        width={200}
        height={200}
        className="object-cover w-full"
      />
    </div>
  );
};

export default AuthorizedImage;
