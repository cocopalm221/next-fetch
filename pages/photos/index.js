import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeaderInfo from "../../components/HeaderInfo";
import PhotosStyle from "../../styles/Photos.module.css";

const photos = ({ cats }) => {
  return (
    <div className={PhotosStyle.photosWrap}>
      <HeaderInfo title="Cats World - photo" />
      <ul className={PhotosStyle.photos}>
        {cats.map((cat) => (
          <li key={cat.name}>
            <Link href={`photos/${cat.id}`}>
              <a>
                <Image
                  src={cat.image.url}
                  width={160}
                  height={130}
                  alt={cat.name}
                />
                <span>{cat.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

//SSG 적용
export const getStaticProps = async () => {
  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${process.env.NEXT_PUBLIC_CATS_KEY}&limit=10`
  );
  const cats = await res.json();
  return {
    props: {
      cats,
    },
    revalidate: 20,
  };
};

export default photos;
